import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { userSignupAction } from "../actions/userAction";

export default function Signup({ history }) {
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, seterror] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      seterror((pre) => {
        return {
          ...pre,
          email: "Please enter email ",
        };
      });
    }
    if (formData.name === "") {
      seterror((pre) => {
        return {
          ...pre,
          name: "Please enter name",
        };
      });
    }
    if (formData.password === "" || formData.cpassword === "") {
      seterror((pre) => {
        return {
          ...pre,
          password: "Please enter password",
          cpassword: "Please confirm password",
        };
      });
    }

    if (
      formData.email !== "" &&
      formData.name !== "" &&
      formData.password !== "" &&
      formData.cpassword !== "" &&
      formData.password === formData.cpassword
    ) {
      dispatch(userSignupAction(formData));
      history.push("/login");
    }

    // if (formData.password !== formData.cpassword) {
    //     seterror({
    //         ...error, password: "Please enter valid password"
    //     })
    // }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          {/* {JSON.stringify(formData)}
          {JSON.stringify(error)} */}
          <div className="card">
            <div className="card-header">Signup</div>
            <div className="card-body">
              <form onSubmit={handleSignup}>
                <div className="input-group">
                  <span className="input-group-text  w-25">Name</span>
                  <input
                    onChange={(e) =>
                      setformData({ ...formData, name: e.target.value })
                    }
                    type="text"
                    className={
                      error.name ? "form-control is-invalid" : "form-control"
                    }
                  />
                  <span className="invalid-feedback">{error.name}</span>
                </div>
                <br />
                <div className="input-group">
                  <span className="input-group-text w-25">email</span>
                  <input
                    onChange={(e) =>
                      setformData({ ...formData, email: e.target.value })
                    }
                    type="text"
                    className={
                      error.email ? "form-control is-invalid" : "form-control"
                    }
                  />
                  <span className="invalid-feedback">{error.email}</span>
                </div>
                <br />
                <div className="input-group">
                  <span className="input-group-text w-25">password</span>
                  <input
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    className={
                      error.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <span className="invalid-feedback">{error.password}</span>
                </div>
                <br />
                <div className="input-group">
                  <span className="input-group-text w-25">confirm</span>
                  <input
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        cpassword: e.target.value,
                      })
                    }
                    type="password"
                    className={
                      error.cpassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <span className="invalid-feedback">{error.cpassword}</span>
                </div>
                <br />
                <button className="btn btn-success btn-lg w-100">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
