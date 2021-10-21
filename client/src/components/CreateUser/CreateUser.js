import React, { useState } from 'react'

import * as api from '../../api/index.js';

const CreateUser = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()
        api.createUser(user);
        setUser({
            username: '',
            password: ''
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="username" onChange={(e) => {
                setUser({ ...user, username: e.target.value});
            }} value={user.password} />
            <input type="text" placeholder="password" onChange={(e) => {
                setUser({ ...user, password: e.target.value});
            }} value={user.password} />
            <button type="submit" >Create User</button>
        </form>
    )
}

export default CreateUser
