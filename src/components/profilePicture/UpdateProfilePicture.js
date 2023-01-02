// @packages
import Cookies from 'js-cookie';
import Cropper from 'react-easy-crop';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @scripts
import PulseLoader from 'react-spinners/PulseLoader';
import getCroppedImg from '../../helpers/getCroppedImg';
import { createPost } from '../../functions/post';
import { updateProfilePicture } from '../../functions/user';
import { uploadImages } from '../../functions/uploadImages';

export default function UpdateProfilePicture({
  setImage,
  image,
  setShow,
  pRef,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    [croppedAreaPixels]
  );

  const updateProfilePictureHandler = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      // path to send to cloudinary
      const path = `${user.id}/profile_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      // send image to cloudinary for url
      const res = await uploadImages(formData, path, user.token);
      // update the profile url in the database
      const updated_picture = await updateProfilePicture(
        res[0].url,
        user.token
      );
      if (updated_picture.success === true) {
        // then create a new post for the profile picture
        const new_post = await createPost(
          'profilePicture',
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (new_post.success === true) {
          // and update the site
          setLoading(false);
          setImage('');
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set(
            'user',
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
          dispatch({
            type: 'UPDATEPICTURE',
            payload: res[0].url,
          });
          setShow(false);
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='postBox update_img'>
      <div className='box_header'>
        <div className='small_circle' onClick={() => setImage('')}>
          <i className='exit_icon'></i>
        </div>
        <span>Update Profile Picture</span>
      </div>
      {error && (
        <div className='postError comment_error'>
          <div className='postError_error'>{error}</div>
          <button className='teal_bttn' onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      <div className='update_image_desc'>
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='textarea_blue details_input'></textarea>
      </div>

      <div className='update_center'>
        <div className='cropper'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape='round'
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className='slider'>
          <div className='slider_circle hover1' onClick={() => zoomOut()}>
            <i className='minus_icon'></i>
          </div>
          <input
            type='range'
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className='slider_circle hover1' onClick={() => zoomIn()}>
            <i className='plus_icon'></i>
          </div>
        </div>
      </div>
      <div className='flex_up'>
        <div className='gray_bttn' onClick={() => getCroppedImage('show')}>
          <i className='crop_icon'></i>Crop photo
        </div>
      </div>
      <div className='flex_p_t'>
        <i className='public_icon'></i>
        Your profile picture is public
      </div>
      <div className='update_submit_wrap'>
        <div className='blue_link' onClick={() => setImage('')}>
          Cancel
        </div>
        <button
          className='teal_bttn'
          disabled={loading}
          onClick={() => updateProfilePictureHandler()}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
