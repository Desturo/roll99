import { React, useEffect, useState } from "react";
import Cookies from "js-cookie";
import auth from "../../logic/auth";

import * as api from "../../api";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const checkAuth = async () => {
    await auth.isAuthenticated();
    auth.authenticated && props.history.push("/home");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    auth.login(user, () => {
      props.history.push("/home");
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
      />
      <br />
      <input
        type="text"
        name="password"
        placeholder="Passowrd"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <br />
      <button type="submit">Login</button>
      <br />
      <button
        type="button"
        onClick={(e) => {
          props.history.push("/register");
        }}
      >
        Register
      </button>
    </form>
  );
};

export default LoginForm;
