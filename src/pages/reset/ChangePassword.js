// @packages
import * as Yup from 'yup';
import LoginInput from '../../components/inputs/loginInput';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  setLoading,
  userInfos,
  setError,
}) {
  const [passwordShown, setPasswordShown] = useState(false);

  const eye = <FontAwesomeIcon icon={faEye} />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, "Password can't be more than 36 characters"),

    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const { email } = userInfos;
  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/changePassword`,
        {
          email,
          password,
        }
      );
      setError('');
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}>
        {(formik) => (
          <Form>
            <div className='password_wrapper'>
              <LoginInput
                type={passwordShown ? 'text' : 'password'}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='New password'
              />
              <i className='password_eye' onClick={togglePasswordVisiblity}>
                {eye}
              </i>{' '}
            </div>
            <LoginInput
              type={passwordShown ? 'text' : 'password'}
              name='conf_password'
              onChange={(e) => setConf_password(e.target.value)}
              placeholder='Confirm new password'
              bottom
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_bttn hover2'>
                Cancel
              </Link>
              <button type='submit' className='teal_bttn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
