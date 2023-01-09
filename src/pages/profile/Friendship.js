// @packages
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../helpers/clickOutside';
import { useSelector } from 'react-redux';
// @scripts
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from '../../functions/user';

export default function Friendship({ friendshipp, profileId }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [friendship, setFriendship] = useState(friendshipp);

  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);

  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileId, user.token);
  };

  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileId, user.token);
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, user.token);
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, user.token);
  };

  const acceptRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptRequest(profileId, user.token);
  };

  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unfriend(profileId, user.token);
  };

  const deleteRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteRequest(profileId, user.token);
  };

  return (
    <div className='friendship'>
      {friendship?.friends ? (
        <div className='friends_menu_wrap'>
          <button className='gray_bttn' onClick={() => setFriendsMenu(true)}>
            <img src='../../../icons/friends.png' alt='' />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className='open_cover_menu' ref={menu}>
              {/* <div className='open_cover_menu_item hover1'>
                <img src='../../../icons/favoritesOutline.png' alt='' />
                Favorites
              </div> */}
              {/* <div className='open_cover_menu_item hover1'>
                <img src='../../../icons/editFriends.png' alt='' />
                Edit Friend list
              </div> */}
              {friendship?.following ? (
                <div
                  className='open_cover_menu_item hover1'
                  onClick={() => unfollowHandler()}>
                  <img src='../../../icons/unfollowOutlined.png' alt='' />
                  Unfollow
                </div>
              ) : (
                <div
                  className='open_cover_menu_item hover1'
                  onClick={() => followHandler()}>
                  <img src='../../../icons/unfollowOutlined.png' alt='' />
                  Follow
                </div>
              )}
              <div
                className='open_cover_menu_item hover1'
                onClick={() => unfriendHandler()}>
                <i className='unfriend_outlined_icon'></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className='teal_bttn' onClick={() => addFriendHandler()}>
            <img src='../../../icons/addFriend.png' alt='' className='invert' />
            <span>Add&nbsp;Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className='teal_bttn' onClick={() => cancelRequestHandler()}>
          <img
            src='../../../icons/cancelRequest.png'
            className='invert'
            alt=''
          />
          <span>Cancel&nbsp;Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className='friends_menu_wrap'>
            <button className='gray_bttn' onClick={() => setRespondMenu(true)}>
              <img src='../../../icons/friends.png' alt='' />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className='open_cover_menu' ref={menu1}>
                <div
                  className='open_cover_menu_item hover1'
                  onClick={() => acceptRequestHanlder()}>
                  Confirm
                </div>
                <div
                  className='open_cover_menu_item hover1'
                  onClick={() => deleteRequestHanlder()}>
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className='flex'>
        {friendship?.following ? (
          <button className='gray_bttn' onClick={() => unfollowHandler()}>
            <img src='../../../icons/follow.png' alt='' />
            <span>Following</span>
          </button>
        ) : (
          <button className='teal_bttn' onClick={() => followHandler()}>
            <img src='../../../icons/follow.png' className='invert' alt='' />
            <span>Follow</span>
          </button>
        )}
        <button className={friendship?.friends ? 'teal_bttn' : 'gray_bttn'}>
          <img
            src='../../../icons/message.png'
            className={friendship?.friends && 'invert'}
            alt=''
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
}
