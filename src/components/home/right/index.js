// @packages
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
// @scripts
import { profileReducer } from '../../../functions/reducers';
import { Search } from '../../../svg';
import Contact from './Contact';
import './style.css';

export default function RightHome({ user }) {
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
  const [shuffledFriends, setShuffledFriends] = useState(false);
  const [shuffledFriendsArray, setShuffledFriendsArray] = useState();

  if (profile?.friends && !shuffledFriends) {
    const shuffledFriends = [...profile?.friends];
    shuffledFriends.sort((a, b) => 0.5 - Math.random());
    setShuffledFriendsArray(shuffledFriends);
    setShuffledFriends(true);
  }
  const color = '#65676b';

  return (
    <div className='right_home'>
      <div className='heading'>Rooster</div>
      <div className='splitter1'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>CCU Friends</div>
          <div className='contacts_header_right'>
            <Link to='/friends' className='contact_circle hover1'>
              <Search color={color} />
            </Link>
          </div>
        </div>
        <div className='contacts_list'>
          {shuffledFriendsArray &&
            shuffledFriendsArray
              .slice(0, 10)
              .map((friend, index) => <Contact friend={friend} key={index} />)}
        </div>
        {loading && <DotLoader color='#0cb1c7' loading={loading} size={30} />}
      </div>
    </div>
  );
}
