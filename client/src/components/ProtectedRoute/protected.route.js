import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../logic/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const checkAuth = async () => {
    await auth.isAuthenticated();
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.authenticated) {
          return <Component {...props}></Component>;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
