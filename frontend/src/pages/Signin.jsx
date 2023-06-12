import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { loginAction } from "../actions/authAction";
export default function Signin({ history }) {
  const dispatch = useDispatch();

  const [email, setemail] = useState("john@gmail.com");
  const [password, setpassword] = useState("123");
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
    history.push("/");
    e.target.reset();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="card mt-5">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  value={email}
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <br />
                <Link to="forget-password" className="offset-sm-5">
                  forgetPassword
                </Link>
                <br />
                <br />
                <button className="btn btn-success btn-lg w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
