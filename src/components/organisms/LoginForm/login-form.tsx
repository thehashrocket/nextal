import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./login-form.module.css";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/router";

interface Values {
  username: string;
  password: string;
}

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const { login } = useLogin();
  const router = useRouter();

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          setMessage("Form submitted");
          setSubmitted(true);

          login(values.email, values.password)
            .then((res) => router.push("/me"))
            .catch((err) => {
              console.log(err);
            });
          // Alert the input values of the form that we filled
          // alert(JSON.stringify(values));
          // Send a POST request to our API endpoint
          // fetch('/api/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ email: values.email, password: values.password }),
          // })
          //   .then((res) => {
          //     if (res.ok) {
          //       return res.json();
          //     } else {
          //       throw new Error('Something went wrong');
          //     }
          //   })
          //   .then((json) => {
          //     console.log('res', json);
          //     setMessage(json.message);
          //     setSubmitted(true);
          //     // // store the user in localStorage.
          //     localStorage.setItem('user', JSON.stringify(json.user));
          //     // Store the last token in the User object in localStorage.
          //     localStorage.setItem('token', JSON.stringify(json.user.tokens));

          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div
              hidden={!submitted}
              className="alert alert-primary"
              role="alert"
            >
              {message}
            </div>
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
