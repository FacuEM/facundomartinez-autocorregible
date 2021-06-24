import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
import styles from "./login.module.scss";

const Login = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        const { email, password } = values;
        const token = await axios.post("http://localhost:8080/login", {
          email,
          password,
        });
        if (token.data.includes("401")) {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "You do not have permissions",
          });
        } else {
          localStorage.setItem("token", token.data);

          Swal.fire({
            icon: "success",
            title: "Logged in!",
            text: "You just logged in!",
          }).then(() => {
            history.push("/");
          });
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(5, "Password is too short - should be 5 chars minimum."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: 0,
                }}
                className="alkemy-form-label"
              >
                Email
              </label>
              <input
                id="email"
                className="alkemy-form-control"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="error-feedback">{errors.email}</div>
              )}
              <label
                htmlFor="password"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: 0,
                }}
                className="alkemy-form-label"
              >
                Password
              </label>
              <input
                className="alkemy-form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className="error-feedback">{errors.password}</div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="alkemy-btn-primary"
                style={{
                  marginBottom: "0px",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Login
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
