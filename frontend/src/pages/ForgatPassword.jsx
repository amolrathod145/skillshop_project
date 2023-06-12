import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { ForgetPasswordAction } from "../actions/userAction";
import * as yup from "yup";
export default function ForgatPassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("Email is required"),
    }),
    onChange: () => {},
    onSubmit: (value) => {
      dispatch(ForgetPasswordAction(value));
    },
  });
  //   const handleForgetPassword = () => {
  //     dispatch(ForgetPasswordAction());
  //   };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="card">
            <div className="card-header">Forget Password</div>
            <div className="card-body">
              <form>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  id=""
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
