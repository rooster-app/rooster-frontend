// @packages
import { Link } from 'react-router-dom';
import { useEffect, useRef, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import './style.css';
import { getFriendsPageInfos } from '../../functions/user';
import {
  Friends,
  Home,
  Menu,
  Messenger,
  Notifications,
  RoosterLogo,
  Search,
} from '../../svg';
import SearchMenu from './SearchMenu';
import useClickOutside from '../../helpers/clickOutside';
import UserMenu from './userMenu';
import UserNotificationsMenu from './UserNotificationsMenu';
import { friendspage } from '../../functions/reducers';

export default function Header({ getAllPosts, page, visitor }) {
  const { user } = useSelector((user) => ({ ...user }));
  // color fill for nav icons
  const color = '#65676b';
  const logoColor = '#ffffff';

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userNotified, setUserNotified] = useState(true);
  const [newNotifications, setNewNotifications] = useState(false);
  const [showUserNotificationsMenu, setShowUserNotificationsMenu] =
    useState(false);
  const usermenu = useRef(null);
  const notifications = useRef(null);

  // local storage for userNotified
  useEffect(() => {
    setUserNotified(JSON.parse(window.localStorage.getItem('userNotified')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('userNotified', userNotified);
  }, [userNotified]);

  useEffect(() => {
    getFriendsData();
    // eslint-disable-next-line
  }, []);

  useClickOutside(notifications, () => {
    setShowUserNotificationsMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  const getAllPostsHandler = async () => {
    if (getAllPosts) {
      getAllPosts();
    }
  };

  // eslint-disable-next-line
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: '',
  });

  useEffect(() => {
    getFriendsData();
    // eslint-disable-next-line
  }, []);

  const getFriendsData = async () => {
    dispatch({ type: 'FRIENDS_REQUEST' });
    const data = await getFriendsPageInfos(user?.token);
    if (data?.success === true) {
      dispatch({ type: 'FRIENDS_SUCCESS', payload: data?.data });
    } else {
      dispatch({ type: 'FRIENDS_ERROR', payload: data?.data });
    }

    if (data.data.requests.length > 0) {
      setUserNotified(false);
      setNewNotifications(true);
    } else {
      setUserNotified(true);
      setNewNotifications(false);
    }
  };

  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <RoosterLogo
              color={logoColor}
              onClick={() => {
                getAllPostsHandler();
              }}
            />
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}>
          <Search color={color} />
          <input
            type='text'
            placeholder='Search Rooster'
            className='hide_input'
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user?.token}
        />
      )}
      <div className='header_middle'>
        <Link
          to='/'
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
          onClick={() => {
            getAllPostsHandler();
          }}>
          {page === 'home' ? (
            <Home color={'#ffffff'} />
          ) : (
            <Home color={color} />
          )}
        </Link>
        <Link
          to='/friends'
          className={`middle_icon ${page === 'friends' ? 'active' : 'hover1'}`}>
          {page === 'friends' ? (
            <Friends color={'#ffffff'} />
          ) : (
            <Friends color={color} />
          )}
        </Link>
      </div>
      <div className='header_right'>
        <Link
          to='/profile'
          className={`profile_link hover1 ${
            page === 'profile' && !visitor ? 'active_link' : ''
          }`}>
          <img src={user?.picture} alt='' />
          <span className='header_username'>{user?.first_name}</span>
        </Link>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={notifications}>
          <div
            onClick={() => {
              setShowUserNotificationsMenu((prev) => !prev);
              setUserNotified(true);
            }}>
            <Notifications />
            <div
              className={userNotified ? 'user_notified' : 'right_notification'}>
              {' '}
              &nbsp;{' '}
            </div>
          </div>
          {showUserNotificationsMenu && (
            <UserNotificationsMenu
              user={user}
              newNotifications={newNotifications}
              setNewNotficiations={setNewNotifications}
              getFriendsData={getFriendsData}
            />
          )}
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={usermenu}>
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}>
            <Menu />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
