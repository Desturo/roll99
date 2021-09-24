import { React, useState, useEffect } from 'react';

import Form from './components/Form/Form.jsx';
import Input from './components/Input/Input.jsx';
import UserForm from './components/UserForm/UserFrom.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';

import { socket } from './services/socket.js';
import { generate } from 'random-key';



function App() {

  const [message, setMessage] = useState();

  const [loggedIn, setLoggedIn] = useState(false)

  const sendMessage = () => {
    socket.emit('toServer', message);
  }
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    socket.once('toClient', (messageObject) => {
      setMessages([...messages, messageObject])
      console.log(`${messageObject.id.substr(0, 4)} said ${messageObject.text}`);
    });
  }, [messages]);

  return (
    <div>
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
      </ul> */}

      <UserForm></UserForm>
      <LoginForm setLoggedIn={ setLoggedIn }></LoginForm>
    </div>
  );
}

export default App;
