// @packages
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// @scripts
import ActivateForm from './ActivateForm';
import CreatePostForm from '../../components/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import { defaultFriend } from '../../functions/user';
import './style.css';

export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  // token param defined in App.js
  const { token } = useParams();

  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true,
      });
      // add default friend on account activation
      await defaultFriend(user?.token);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3500);
    }
  };

  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification succeeded'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed'
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <CreatePostForm user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
