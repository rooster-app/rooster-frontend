// @packages
import axios from 'axios';
import { useState } from 'react';
// @scripts
import './style.css';

const SendVerification = ({ user }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/resendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='send_verification'>
      <span>
        This account has not been verified. Please verify your account before it
        is deleted in 24 hours from creating.
      </span>

      <button
        className='teal_bttn'
        onClick={() => {
          sendVerificationLink();
        }}>
        Click here to resend email verification
      </button>
      {error && <div className='error_text'>{error}</div>}
      {success && <div className='success_text'>{success}</div>}
    </div>
  );
};

export default SendVerification;
