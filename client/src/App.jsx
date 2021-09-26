import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Form from './components/Form/Form.jsx';
import Input from './components/Input/Input.jsx';
import UserForm from './components/UserForm/UserFrom.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import About from './components/About/About.jsx';
import Nav from './components/Nav/Nav.jsx';
import Shop from './components/Shop/Shop.jsx';
import ItemDetail from './components/ItemDetail/ItemDetail';


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
    <Router>
      <div className='App'>
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

        <Nav/>
        <Switch>
          <Route path='/about' component={ About } />
          <Route path='/' exact component={ UserForm } />
          <Route path='/shop' exact component={ Shop } />
          <Route path='/shop/:id' component={ ItemDetail }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
