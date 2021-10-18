import { React, useState, useContext } from 'react';
import Cookies from "js-cookie";    

import * as api from '../../api';
import AuthApi from '../../AuthApi';

const LoginForm = () => {
    const Auth = useContext(AuthApi);

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const bodyObject = { 
                username: user.username,
                password: user.password
            }
            const { data } = await api.loginUser(bodyObject);

            if(data.loginValid) {
                Auth.setAuth(true)
            }
            
        } catch (error) {
            console.log('Error in api request from frontend when trying to check login');
            console.log(error);
        }

    }
    

    return(
        <form autoComplete="off" onSubmit={ handleSubmit }>
            <input type="text" name="username" placeholder='Username' onChange={ (e) => {
                setUser({ ...user, username: e.target.value})
            }}/> <br />

            <input type="text" name="password" placeholder='Passowrd' onChange={ (e) => {
                setUser({ ...user, password: e.target.value})
            }}/> <br />

            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;