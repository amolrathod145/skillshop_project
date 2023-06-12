import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../actions/userAction";
export default function UserTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  useEffect((e) => {
    dispatch(getAllUsersAction());
  }, []);
  const handledelete = () => {
      dispatch()
  };
  return (
    <div className="container">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    data-bs-target="#modal"
                    data-bs-toggle="modal"
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm ms-3">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="modal" tabindex="-1" role="dialog" id="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">You are sure to delete</h5>
            </div>
            <div className="modal-body">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handledelete}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
