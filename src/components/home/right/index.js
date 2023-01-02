// @scripts
import Contact from './Contact';
import { Dots, NewRoom, Search } from '../../../svg';
import './style.css';

export default function RightHome({ user, profile }) {
  const color = '#65676b';
  return (
    <div className='right_home'>
      <div className='heading'>Rooster</div>
      <div className='splitter1'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>CCU Contacts</div>
          <div className='contacts_header_right'>
            {/* <div className='contact_circle hover1'>
              <NewRoom color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Search color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Dots color={color} />
            </div> */}
          </div>
        </div>
        <div className='contacts_list'>
          {profile?.friends &&
            profile?.friends
              ?.slice(0, 20)
              .map((friend, index) => <Contact friend={friend} key={index} />)}
        </div>
      </div>
    </div>
  );
}
