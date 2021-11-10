import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/protected.route";

import Form from "./components/Form/Form.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

import { socket } from "./services/socket.js";
import { generate } from "random-key";
import axios from "axios";
import CreateUser from "./components/CreateUser/CreateUser";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState();

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
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/register" component={CreateUser} />
          <ProtectedRoute exact path="/home" component={LandingPage} />
          <ProtectedRoute exact path="/character/create" component={Form} />
          <ProtectedRoute exact path="/form" component={Form} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
