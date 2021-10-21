import { React, useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import Form from "./components/Form/Form.jsx";
import Input from "./components/Input/Input.jsx";
import UserForm from "./components/UserForm/UserFrom.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import AuthApi from "./AuthApi";

import { socket } from "./services/socket.js";
import { generate } from "random-key";
import axios from "axios";
import CreateUser from "./components/CreateUser/CreateUser";

function App() {

  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState();

  const [auth, setAuth] = useState(false);

  const sendMessage = () => {
    socket.emit("toServer", message);
  };
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.once("toClient", (messageObject) => {
      setMessages([...messages, messageObject]);
      console.log(
        `${messageObject.id.substr(0, 4)} said ${messageObject.text}`
      );
    });   
  }, [messages]);


  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
          <Routes/>
      </Router>
    </AuthApi.Provider>
  );
}

const Routes = () => {
  const Auth = useContext(AuthApi);
  return (
      <Switch>
          <ProtectedLogin path='/login' auth={Auth.auth} component={LoginForm}/>
          <ProtectedRoute path='/form' auth={Auth.auth} component={Form}/>
          <Route path='/signIn' component={CreateUser}></Route>
      </Switch>
  )
}

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
  return(
      <Route 
      {...rest}
      render={() => auth ? (
          <Component/>
      ): 
          (
              <Redirect to="/login" />
          )
      }
      />
  )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => {
  return(
      <Route 
      {...rest}
      render={() => !auth ? (
          <Component/>
      ): 
          (
              <Redirect to="/form" />
          )
      }
      />
  )
}

export default App;
