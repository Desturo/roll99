import { React, useEffect, useState } from "react";
import Cookies from "js-cookie";
import auth from "../../logic/auth";

import * as api from "../../api";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    auth.isAuthenticated().then((status) => {
      status && props.history.push("/form");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    auth.login(user, () => {
      props.history.push("/form");
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />{" "}
      <br />
      <input
        type="text"
        name="password"
        placeholder="Passowrd"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />{" "}
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
