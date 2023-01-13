// @packages
import { Link } from 'react-router-dom';

export default function Friends({ friends, visitor }) {
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>
        CCU Friends
        {!visitor && (
          <Link to='/friends/all' className='profile_header_link'>
            See all friends
          </Link>
        )}
      </div>
      {friends && (
        <div className='profile_card_count'>
          {friends?.length === 0
            ? ''
            : friends?.length === 1
            ? '1 Friend'
            : `${friends?.length} Friends`}
        </div>
      )}
      <div className='profile_card_grid'>
        {friends &&
          friends.slice(0, 9).map((friend, index) => (
            <Link
              key={index}
              to={`/profile/${friend?.username}`}
              className='profile_photo_card'>
              <img src={friend.picture} alt='' />
              <span>
                {friend?.first_name} {friend?.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
