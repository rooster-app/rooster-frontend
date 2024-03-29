// @packages
import Cropper from 'react-easy-crop';
import PulseLoader from 'react-spinners/PulseLoader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import OldCovers from './OldCovers';
import getCroppedImg from '../../helpers/getCroppedImg';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../functions/post';
import { updateCover } from '../../functions/user';
import { uploadImages } from '../../functions/uploadImages';

export default function Cover({ cover, visitor, photos }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [error, setError] = useState('');
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState();

  const menuRef = useRef(null);
  const refInput = useRef(null);
  const cRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
    // eslint-disable-next-line
  }, [window.innerWidth]);

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      setShowCoverMenu(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large. Max size 5MB.`);
      setShowCoverMenu(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
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

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user?.id}/cover_pictures`;

      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      // Upload to cloudinary for img url
      const response = await uploadImages(formData, path, user?.token);
      // Update the user cover with the url in the database
      const updatedCoverUrl = await updateCover(response[0].url, user?.token);
      if (updatedCoverUrl === 'success') {
        // Create a new cover picture post
        const new_post = await createPost(
          'coverPicture',
          null,
          null,
          response,
          user?.id,
          user?.token
        );
        if (new_post.success === true) {
          setLoading(false);
          setCoverPicture('');
          cRef.current.src = response[0].url;
        } else {
          setLoading(false);
          setError(new_post.message);
        }
      } else {
        setLoading(false);
        setError(updatedCoverUrl);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className='profile_cover' ref={coverRef}>
      {coverPicture && (
        <div className='save_changes_cover'>
          <div className='save_changes_left'>
            <i className='public_icon'></i>
            Your cover photo is public
          </div>
          <div className='save_changes_right'>
            <button
              className='teal_bttn opacity_btn'
              onClick={() => setCoverPicture('')}>
              Cancel
            </button>
            <button className='teal_bttn ' onClick={() => updateCoverPicture()}>
              {loading ? <PulseLoader color='#fff' size={5} /> : 'Save changes'}
            </button>
          </div>
        </div>
      )}
      <input
        type='file'
        ref={refInput}
        hidden
        accept='image/jpeg,image/png,image/webp,image/gif'
        onChange={handleImage}
      />
      {error && (
        <div className='postError comment_error cover_error'>
          <div className='postError_error'>{error}</div>
          <button className='teal_bttn' onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className='cover_cropper'>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit='horizontal-cover'
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className='cover' alt='' ref={cRef} />
      )}
      {!visitor && (
        <div className='update_cover_wrapper'>
          <div
            className='open_cover_update'
            onClick={() => setShowCoverMenu((prev) => !prev)}>
            <i className='camera_filled_icon'></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className='open_cover_menu' ref={menuRef}>
              <div
                className='open_cover_menu_item hover1'
                onClick={() => setShow(true)}>
                <i className='photo_icon'></i>
                Select Photo
              </div>
              <div
                className='open_cover_menu_item hover1'
                onClick={() => refInput.current.click()}>
                <i className='upload_icon'></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
