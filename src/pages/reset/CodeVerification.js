// @packages
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import axios from "axios";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

export default function CodeVerification({
  code,
  setCode,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfos,
}) {

  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters.")
      .max("5", "Code must be 5 characters."),
  });

  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/validateResetCode`,
        { email, code }
      );
      setVisible(3);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Code verification</div>
      <div className="reset_form_text">
        Please enter the verification code sent to your inbox. 
        Emails should arrive within one minute.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification code"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_bttn hover2">
                Cancel
              </Link>
              <button type="submit" className="teal_bttn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
