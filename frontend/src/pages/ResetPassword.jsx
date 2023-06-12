import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
export default function ResetPassword({ match }) {
  const [error, setError] = useState(false);
  const { id, token } = useParams();
  const history = useHistory();
  const validateIdAndToken = async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/validate-reset-password`,
        { id, token }
      );
      console.log(data);
      if (!data.success) {
        setError(true);
        history.push("/");
      }
    } catch (error) {
      history.push("/");
    }
  };
  useEffect(async (e) => {
    validateIdAndToken();
    console.log(match.params);
  }, []);
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validateYupSchema: yup.object({
      password: yup
        .string()
        .min(3, "Password must be at least 6 charecter")
        .required("password is Required"),
      cpassword: yup
        .string()
        .min(3, "password must be at least 6 characters")
        .required("conforn password is required"),
    }),
    onSubmit: async (values) => {
      if (formik.values.password === formik.values.cpassword) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/api/auth/update-password`,
          { id, token, password: formik.values.password }
        );

        console.log(data);
        data.success && history.push("/login");
      }
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          {!error ? (
            <h1>Something went Wrong</h1>
          ) : (
            <div className="card">
              <div className="card-header">Reset Password</div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="password"
                    name="password"
                    id=""
                    className="form-control"
                    onChange={formik.handleChange}
                  />{" "}
                  <br />
                  <input
                    type="password"
                    name="cpassword"
                    id=""
                    className="form-control"
                    onChange={formik.handleChange}
                  />{" "}
                  <br />
                  <button className="btn btn-primary w-100">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
