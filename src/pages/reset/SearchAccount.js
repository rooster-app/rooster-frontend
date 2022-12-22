// @packages
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
// @scripts
import LoginInput from "../../components/inputs/loginInput";

export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {

  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address ir required.")
      .email("Must be a valid email address.")
      .max(50, "Email address can't be more than 50 characters."),
  });

  const handleSearch = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/findUser`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your Coastal Carolina University email address to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Coastal email address"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_bttn hover2">
                Cancel
              </Link>
              <button type="submit" className="teal_bttn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
