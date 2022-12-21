// @packages
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// ***Auth: block line below until beta***
import { useNavigate } from 'react-router-dom';

// @scripts
import CreatePostForm from '../../components/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import ActivateForm from './ActivateForm';
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
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true,
      });
      // ***Auth: block lines below until beta***
      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (error) {
      setError(error.response.data.message);
      // ***Auth: block lines below until beta***
      setTimeout(() => {
        navigate('/');
      }, 3500);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <CreatePostForm user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
