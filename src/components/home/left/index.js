// @packages
import { useState } from 'react';
// @scripts
import './style.css';
import LeftLink from './LeftLink';
import Shortcut from './Shortcut';
import { ArrowDown1 } from '../../../svg';
import { Link } from 'react-router-dom';
import { left } from '../../../data/home';

export default function LeftHome({ user, profile }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover1'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div
          className='left_link hover1'
          onClick={() => {
            setVisible(true);
          }}>
          <div className='small_circle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='more_left'>
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className='left_link hover1 '
            onClick={() => {
              setVisible(false);
            }}>
            <div className='small_circle rotate360'>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
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
        <Link to='/'>Ads</Link>
        <span>. </span>
        <Link to='/'>
          <i className='ad_choices_icon'></i>{' '}
        </Link>
        Rooster © 2023
      </div>
    </div>
  );
}
