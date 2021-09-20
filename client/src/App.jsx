import { React, useState, useEffect } from 'react';

import Form from './components/Form/Form.jsx';
import Input from './components/Input/Input.jsx';

import { socket } from './services/socket.js';



function App() {

  const [message, setMessage] = useState();
  const sendMessage = () => {
    socket.emit('message', message);
  }
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    socket.on('message', (messageObject) => {
      setMessages([...messages, messageObject])
      console.log(`${messageObject.id.substr(0, 4)} said ${messageObject.text}`);
    });
  }, [messages]);

  return (
    <div>
      <Form></Form>
      <Input sendMessage={ sendMessage } message={ message } setMessage={ setMessage }></Input>
      <ul>
        {
          messages.map((message) => {
            return (
              <li> { message.id } &nbsp; said &nbsp; { message.text}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
