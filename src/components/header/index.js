// @packages
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import './style.css';
import {
  ArrowDown,
  Friends,
  // Gaming,
  Home,
  // HomeActive,
  // Market,
  Menu,
  Messenger,
  Notifications,
  RoosterLogo,
  Search,
  // Watch,
} from '../../svg';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import useClickOutside from '../../helpers/clickOutside';
import UserMenu from './userMenu';

export default function Header({ getAllPosts, page }) {
  const { user } = useSelector((user) => ({ ...user }));
  // color fill for nav icons
  const color = '#65676b';
  const logoColor = '#ffffff';

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <RoosterLogo
              color={logoColor}
              onClick={() => {
                getAllPosts();
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
            getAllPosts();
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
            <Friends color={'#ffffff'}  />
          ) : (
            <Friends color={color} />
          )}
        </Link>
        {/* <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link> */}
        {/* <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link> */}
        {/* <Link to='/' className='middle_icon hover1 '>
          <Gaming color={color} />
        </Link> */}
      </div>
      <div className='header_right'>
        <Link
          to='/profile'
          className={`profile_link hover1 ${
            page === 'profile' ? 'active_link' : ''
          }`}>
          <img src={user?.picture} alt='' />
          <span className='header_username'>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && 'active_header'}`}
          ref={allmenu}>
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}>
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'> &nbsp; </div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={usermenu}>
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
