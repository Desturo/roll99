import { React, useState } from 'react';

import * as api from '../../api';

const UserForm = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.createUser(user);
            console.log(data);
        } catch (error) {
            window.alert(error.response.data.type);
        }
    }
    
    return(
        <form autoComplete="off" onSubmit={ handleSubmit }>

            <label htmlFor="username">User Name: &nbsp;</label>
            <input type="text" name="username" onChange={ (e) => {
                setUser({ ...user, username: e.target.value})
            }}/> <br />

            <label htmlFor="password">Password: &nbsp;</label>
            <input type="text" name="password" onChange={ (e) => {
                setUser({ ...user, password: e.target.value})
            }}/> <br />

            <button type="submit">Submit</button>
        </form>
    )
}

export default UserForm;
