import { React, useState } from 'react';

import Form from './components/Form/Form.jsx';
import Input from './components/Input/Input.jsx';

import { socket } from './services/socket.js';

function App() {

  const [message, setMessage] = useState();
  const sendMessage = () => {
    socket.emit('message', message);
  }
  

  return (
    <div>
      <Form></Form>
      <Input sendMessage={ sendMessage } message={ message } setMessage={ setMessage }></Input>
    </div>
  );
}

export default App;
