import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../logic/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [authState, setAuthState] = useState(false);
  //   let authState = () => {
  //     auth.isAuthenticated().then((state) => {
  //       console.log(state);
  //       return state;
  //     });
  //   }
  const test = async () => {
    console.log(await auth.isAuthenticated());
    setAuthState(await auth.isAuthenticated());
  };
  console.log(test());
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState) {
          return <div {...props}>test</div>;
        } else {
          return <div {...props}>back</div>; //<Redirect to="/" />
        }
      }}
    />
  );
};

export default ProtectedRoute;
