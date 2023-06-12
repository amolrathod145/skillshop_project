import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Protected({ Compo }) {
  const history = useHistory();

  const { loginUser } = useSelector(
    state => state.loggedIn
  );

  !loginUser?.name && history.push("/");

  return <Compo />;
}
