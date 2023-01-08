// @packages
import PulseLoader from 'react-spinners/PulseLoader';
import { useRef, useState } from 'react';
// @scripts
import './style.css';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../functions/post';
import PostError from './PostError';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { uploadImages } from '../../functions/uploadImages';

export default function CreatePostModal({
  dispatch,
  posts,
  profile,
  setPostModalVisible,
  user,
}) {
  const popup = useRef(null);
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');

  useClickOutside(popup, () => {
    setPostModalVisible(false);
  });

  const postSubmit = async () => {
    if (background && !images.length) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.success === true) {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground('');
        setText('');
        setPostModalVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.id}/post_images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const response = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.success === true) {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [res.data, ...posts],
        });
        setText('');
        setImages('');
        setPostModalVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.success === true) {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground('');
        setText('');
        setPostModalVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log('Create Post Failed...');
    }
  };
  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
              setPostModalVisible(false);
            }}>
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img src={user.picture} alt='' className='box_profile_img' />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              {/* <i className="arrowDown_icon"></i> */}
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className='post_submit teal_bttn'
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
