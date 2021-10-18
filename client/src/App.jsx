import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import Form from "./components/Form/Form.jsx";
import Input from "./components/Input/Input.jsx";
import UserForm from "./components/UserForm/UserFrom.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

import { socket } from "./services/socket.js";
import { generate } from "random-key";
import axios from "axios";

function App() {

  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState();

  const [loggedIn, setLoggedIn] = useState(false);

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

  const logIn = async () => {
    const data = await axios.post('http://localhost:5000/auth/login',{username: 'Kenu', password: 'keno2'});
    console.log(data);
  }

  return (
    <Router>
      <div className="App">
        <button
          onClick={() => {
            logIn();
          }}
        >
          Log
        </button>
        <button
          onClick={() => {
            console.log(Cookies.get("jwT"));
          }}
        >
          Test
        </button>
        {/* <Form></Form>
        <Input sendMessage={ sendMessage } message={ message } setMessage={ setMessage }></Input>
        <ul>
          {
            messages.map((message) => {
              return (
                <li key={ generate() }> { message.id } &nbsp; said &nbsp; { message.text}</li>
              )
            })
          }
        </ul>

        <UserForm></UserForm>
        <LoginForm setLoggedIn={ setLoggedIn }></LoginForm> */}
      </div>
    </Router>
  );
}

export default App;
