// @packages
import axios from 'axios';
import { useEffect, useReducer } from 'react';
// @scripts
import './style.css';
import LeftLink from './LeftLink';
import Shortcut from './Shortcut';
import { Link } from 'react-router-dom';
import { left } from '../../../data/home';
import { profileReducer } from '../../../functions/reducers';

export default function LeftHome({ user }) {
  // eslint-disable-next-line
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getProfile/${user?.username}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (data.success) {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          link={link.link}
          notification={link.notification}
        />
      ))}
      <div className='splitter'></div>
      <div className='shortcut'>
        <div className='heading'>Shortcuts</div>
        <div className='edit_shortcut'>
          <Link to='/profile'>Edit</Link>
        </div>
      </div>
      <div className='shortcut_list'>
        <Shortcut
          link='https://www.youtube.com/'
          img='../../images/ytb.png'
          name='YouTube'
        />
        <Shortcut
          link={
            profile?.details?.instagram
              ? `https://www.instagram.com/${profile?.details.instagram}`
              : 'https://www.instagram.com/'
          }
          img='../../images/insta.png'
          name='My Instagram'
        />
        <Shortcut
          link={
            profile?.details?.github
              ? `https://www.github.com/${profile?.details.github}`
              : 'https://www.github.com/'
          }
          img='../../images/github.png'
          name='My GitHub'
        />
        <Shortcut
          link={
            profile?.details?.linkedin
              ? `https://www.linkedin.com/in/${profile?.details.linkedin}`
              : 'https://www.linkedin.com/'
          }
          img='../../images/linkedin.png'
          name='My Linkedin'
        />
      </div>
      <div className={`rooster_copyright`}>
        <Link to='/'>Privacy</Link>
        <span>. </span>
        <Link to='/'>Terms</Link>
        <span>. </span>
        <Link to='/'>
          <i className='ad_choices_icon'></i>{' '}
        </Link>
        Rooster © 2023
      </div>
    </div>
  );
}
