import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../logic/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    auth.isAuthenticated();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.authenticated) {
          return <div {...props}>test</div>;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
