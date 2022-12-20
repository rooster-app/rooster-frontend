// @packages
import { useState } from "react";
// @scripts
import "./style.css";
import Footer from "../../components/footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";


export default function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible}/>
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer/>
      </div>
    </div>
  );
}
