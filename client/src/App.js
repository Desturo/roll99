import Form from './components/Form/Form.jsx';
import Input from './components/Input/Input.jsx';

import { socket } from './services/socket.js';

function App() {
  
  socket.emit('message', 'test');

  const sendMessage = (message) => {
    console.log('send message');
  }
  

  return (
    <div>
      <Form></Form>
      <Input sendMessage={ sendMessage }></Input>
    </div>
  );
}

export default App;
