import React, { useState } from "react";

import * as api from "../../api/index.js";
import auth from "../../logic/auth.js";

const CreateUser = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.createUser(user);
    auth.login(user, () => {
      props.history.push("/home");
    });
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button type="submit">Create User</button>
      <br />
      <button
        type="button"
        onClick={(e) => {
          props.history.push("/");
        }}
      >
        Back to Login
      </button>
    </form>
  );
};

export default CreateUser;
