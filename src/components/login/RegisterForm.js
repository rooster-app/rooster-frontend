// @packages
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { DotLoader } from 'react-spinners';
import axios from 'axios';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// @scripts
import CCUcollege from './CCUCollegeSelect';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import RegisterInput from '../inputs/registerInput';

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dateError, setDateError] = useState('');
  const [error, setError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    ccu_college: '',
    password: '',
    birth_year: new Date().getFullYear(),
    birth_month: new Date().getMonth() + 1,
    birth_day: new Date().getDate(),
    gender: '',
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    ccu_college,
    birth_year,
    birth_month,
    birth_day,
    gender,
  } = user;

  const [collegeError, setCollegeError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(birth_year, birth_month, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name friend?")
      .min(2, 'Fisrt name must be between 2 and 18 characters')
      .max(18, 'First name must be between 2 and 18 characters')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    last_name: Yup.string()
      .required("What's your last name friend?")
      .min(2, 'Last name must be between 2 and 18 characters')
      .max(18, 'Last name must be between 2 and 18 characters')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    email: Yup.string()
      .required(
        "You'll need this to log in and if you need to reset your password. CCU email address required."
      )
      .email('Enter a valid email address')
      .max(90, 'Email must be less than 90 characters')
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
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  });

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`,
        {
          first_name,
          last_name,
          email,
          ccu_college,
          password,
          birth_year,
          birth_month,
          birth_day,
          gender,
        }
      );
      setError('');
      setSuccess(data.message);
      setLoading(false);
      const { message, ...rest } = data;
      setTimeout(async () => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 3500);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's free and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            ccu_college,
            birth_year,
            birth_month,
            birth_day,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(birth_year, birth_month - 1, birth_day);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan100 = new Date(1970 + 100, 0, 1);
            if (ccu_college === '') {
              setCollegeError('Please select your college at CCU');
            } else if (current_date - picked_date < atleast14) {
              setCollegeError('');
              setCollegeError('');
              setDateError('Please make sure to use your real date of birth');
            } else if (current_date - picked_date > noMoreThan100) {
              setCollegeError('');
              setDateError(
                'Please make sure that you use your real date of birth'
              );
            } else if (gender === '') {
              setCollegeError('');
              setDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setCollegeError('');
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}>
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Last name'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Coastal email address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <div className='password_wrapper'>
                  <RegisterInput
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='New password'
                    name='password'
                    onChange={handleRegisterChange}
                  />
                  <i className='password_eye' onClick={togglePasswordVisiblity}>
                    {eye}
                  </i>{' '}
                </div>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>CCU College</div>
                <CCUcollege
                  collegeError={collegeError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  birth_day={birth_day}
                  birth_month={birth_month}
                  birth_year={birth_year}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='teal_bttn open_signup'>Sign Up</button>
              </div>
              <DotLoader color='#0cb1c7' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}.</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
