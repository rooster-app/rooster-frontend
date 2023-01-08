// @packages
import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
// @scripts
import MenuItem from './MenuItem';
import useOnClickOutside from '../../helpers/clickOutside';
import { deletePost, savePost } from '../../functions/post';

export default function PostMenu({
  savedPost,
  images,
  imagesLength,
  postId,
  postRef,
  postUserId,
  setSavedPost,
  setShowMenu,
  token,
  userId,
}) {
  // eslint-disable-next-line
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));

  const saveHandler = async () => {
    savePost(postId, token);
    if (savedPost) {
      setSavedPost(false);
    } else {
      setSavedPost(true);
    }
  };

  const downloadImages = async () => {
    images.map((img) => {
      return saveAs(img.url, 'rooster-image.jpg');
    });
  };

  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.success === true) {
      postRef.current.remove();
    }
  };

  return (
    <ul className='post_menu' ref={menu}>
      {/* {test && <MenuItem icon='pin_icon' title='Pin Post' />} */}
      <div onClick={() => saveHandler()}>
        {savedPost ? (
          <MenuItem
            icon='save_icon'
            title='Unsave Post'
            subtitle='Remove this from your saved items.'
          />
        ) : (
          <MenuItem
            icon='save_icon'
            title='Save Post'
            subtitle='Add this to your saved items.'
          />
        )}
      </div>
      <div className='line'></div>
      {/* {test && <MenuItem icon='edit_icon' title='Edit Post' />} */}
      {/* {!test && (
        <MenuItem
          icon='turnOnNotification_icon'
          title='Turn on notifications for this post'
        />
      )} */}
      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon='download_icon' title='Download' />
        </div>
      )}
      {/* {imagesLength && (
        <MenuItem icon='fullscreen_icon' title='Enter Fullscreen' />
      )} */}
      {/* {test && <MenuItem img='../../../icons/lock.png' title='Edit audience' />} */}
      {/* {test && (
        <MenuItem
          icon='turnOffNotifications_icon'
          title='Turn off notifications for this post'
        />
      )} */}
      {/* {test && <MenuItem icon='delete_icon' title='Turn off translations' />} */}
      {/* {test && <MenuItem icon='date_icon' title='Edit Date' />} */}
      {/* {test && (
        <MenuItem icon='refresh_icon' title='Refresh share attachment' />
      )} */}
      {/* {test && <MenuItem icon='archive_icon' title='Move to archive' />} */}
      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon='trash_icon'
            title='Move to trash'
            subtitle='This post will be permanently deleted'
          />
        </div>
      )}
      {!test && <div className='line'></div>}
      {/* {!test && (
        <MenuItem
          img='../../../icons/report.png'
          title='Report post'
          subtitle="I'm concerned about this post"
        />
      )} */}
    </ul>
  );
}
