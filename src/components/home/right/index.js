// @packages
import { useState } from 'react';
// import { Dots, NewRoom, Search } from '../../../svg';

// @scripts
import Contact from './Contact';
import './style.css';

export default function RightHome({ user, profile }) {
  const [shuffledFriends, setShuffledFriends] = useState(false);
  const [shuffledFriendsArray, setShuffledFriendsArray] = useState();

  if (profile?.friends && !shuffledFriends) {
    const shuffledFriends = [...profile?.friends];
    shuffledFriends.sort((a, b) => 0.5 - Math.random());
    setShuffledFriendsArray(shuffledFriends);
    setShuffledFriends(true);
  }
  // const color = '#65676b';

  return (
    <div className='right_home'>
      <div className='heading'>Rooster</div>
      <div className='splitter1'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>CCU Friends</div>
          <div className='contacts_header_right'>
            {/* <div className='contact_circle hover1'>
              <NewRoom color={color} />
            </div> */}
            {/* <div className='contact_circle hover1'>
              <Search color={color} />
            </div> */}
            {/* <div className='contact_circle hover1'>
              <Dots color={color} />
            </div> */}
          </div>
        </div>
        <div className='contacts_list'>
          {shuffledFriendsArray &&
            shuffledFriendsArray
              .slice(0, 10)
              .map((friend, index) => <Contact friend={friend} key={index} />)}
        </div>
      </div>
    </div>
  );
}
