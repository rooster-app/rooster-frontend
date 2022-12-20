// @packages
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
// @scripts
import RoosterImage from "../../images/rooster-logo.png";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

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
            validationSchema={loginValidation}>
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Coastal Email Address'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                  bottom
                />
                <button type='submit' className='teal_bttn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/forgot' className='forgot_password'>
            Forgotten Password?
          </Link>
          <div className='sign_splitter'></div>
          <button className='teal_bttn open_signup'>Create Account</button>
        </div>
      </div>
    </div>
  );
}
