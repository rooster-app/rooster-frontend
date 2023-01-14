// @packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserNotificationsMenu({
  getFriendsData,
  newNotifications,
  setNewNotficiations
}) {
  const [visible, setVisible] = useState(0);

  // useEffect(() => {
  //   getFriendsData();
  // }, [getFriendsData]);

  return (
    <div className='mmenu'>
      {visible === 0 && (
        <div>
          <div className='mmenu_splitter'></div>
          <div className='mmenu_main hover3'>
            <div className='small_circle'>
              <i className='all_friends_icon'></i>
            </div>
            <div className='mmenu_col'>
              <div className='mmenu_span1'>Notifications</div>
            </div>
          </div>
          <div className='mmenu_splitter'></div>
          <Link
            to='/friends/requests'
            className='mmenu_item hover3'
            onClick={() => {
              setVisible(1);
              setNewNotficiations(false)
            }}>
            <div className='small_circle'>
              <i className='friends_requests_icon'></i>
            </div>
            <span>
              {newNotifications ? 'You have active friend requests' : 'No new requests'}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
