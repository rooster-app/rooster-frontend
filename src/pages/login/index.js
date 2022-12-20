// @scripts
import "./style.css";
import Footer from "../../components/footer";
import LoginForm from "../../components/login/LoginForm";


export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm/>
        <div className="register"></div>
        <Footer/>
      </div>
    </div>
  );
}
