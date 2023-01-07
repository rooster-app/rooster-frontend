// @packages
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import ProfilePicture from '../../components/profilePicture';
import Friendship from './Friendship';

export default function ProfielPictureInfos({
  profile,
  visitor,
  photos,
  othername,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const [show, setShow] = useState(false);
  const pRef = useRef(null);

  return (
    <div className='profile_img_wrap'>
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className='profile_w_left'>
        <div className='profile_w_img'>
          <div
            className='profile_w_bg'
            ref={pRef}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile?.picture})`,
            }}></div>
          {!visitor && (
            <div
              className='profile_circle hover1'
              onClick={() => setShow(true)}>
              <i className='camera_filled_icon'></i>
            </div>
          )}
        </div>
        <div className='profile_w_col'>
          <div className='profile_name'>
            {profile?.first_name} {profile?.last_name}
            <div className='othername'>{othername && `(${othername})`}</div>
          </div>
          <div className='profile_friend_count'>
            {profile?.friends && (
              <div className='profile_card_count'>
                {profile?.friends.length === 0
                  ? ''
                  : profile?.friends.length === 1
                  ? '1 CCU Friend'
                  : `${profile?.friends.length} CCU Friends`}
              </div>
            )}
          </div>
          <div className='profile_friend_imgs'>
            {profile?.friends &&
              profile.friends.slice(0, 5).map((friend, index) => (
                <Link to={`/profile/${friend.username}`} key={index}>
                  <img
                    src={friend.picture}
                    alt=''
                    style={{
                      transform: `translateX(${-index * 7}px)`,
                      zIndex: `${index}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor && user.verified ? (
        <Friendship
          friendshipp={profile?.friendship}
          profileId={profile?._id}
        />
      ) : !visitor ? (
        <div className='profile_w_right'>
          {/* <div className="teal_bttn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div> */}
          <div className='teal_bttn edit-bttn'>
            <i className='edit_icon'></i>
            <span>Edit Profile Enabled</span>
          </div>
        </div>
      ) : (
        <div className='profile_w_right'>
          <div className='gray_bttn'>
            <i className='friends_requests_icon'></i>
            {/* Then the user account is not verified */}
            <span>Activate Account to Follow</span>
          </div>
        </div>
      )}
    </div>
  );
}
