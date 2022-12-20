// @packages
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import DotLoader from 'react-spinners/DotLoader';
import LoginInput from '../../components/inputs/loginInput';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// @scripts
import RoosterImage from '../../images/rooster-logo.png';

const loginInfos = {
  email: '',
  password: '',
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(loginInfos);
  const [passwordShown, setPasswordShown] = useState(false);

  const eye = <FontAwesomeIcon icon={faEye} />;

  const { email, password } = login;

  const loginInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100)
      // Code To Restrict Email Domain: @coastal.edu
      .test(
        'coastal-domain',
        'Email domain @coastal.edu required',
        function (email_value) {
          const validRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@coastal.edu+$/,
            'gm'
          );
          if (email_value) {
            return email_value.toLowerCase().match(validRegex);
          }
        }
      ),
    password: Yup.string().required('Password is required'),
  });

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img className='rooster_img' src={RoosterImage} alt='' />
        <span>A social networking site for the CCU community</span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <span className='logo_name'>Rooster</span>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}>
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Coastal Email Address'
                  onChange={loginInputChangeHandler}
                />
                <div className='password_wrapper'>
                  <LoginInput
                    type={passwordShown ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    onChange={loginInputChangeHandler}
                    bottom
                  />
                  <i
                    className='password_eye'
                    onClick={togglePasswordVisiblity}>
                    {eye}
                  </i>{' '}
                </div>
                <button type='submit' className='teal_bttn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/forgot' className='forgot_password'>
            Forgotten Password?
          </Link>
          <DotLoader color='#1876f2' loading={loading} size={30} />

          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>

          <button
            className='teal_bttn open_signup'
            onClick={() => setVisible(true)}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
