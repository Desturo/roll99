import React, { useEffect, useState } from 'react'

import * as api from "../../api/index"
import auth from '../../logic/auth'


const Characters = (props) => {
    const [characters, setCharacters] = useState([])
    const [username, setUsername] = useState("nouser");

    const checkUser = async () => {
        await auth.updateUser();
        setUsername(auth.user);
        fetchChars(auth.userID);
    };

    const fetchChars = async () => {
        const sendObject = { id: auth.userID}
        const { data } = await api.fetchCharacters(sendObject);
        console.log(data);
    }

    useEffect(() => {
        checkUser();
    }, []);
    return (
        <div>
        <h3 style={ {cursor: "pointer"}} onClick={() => {
            auth.logout(() => {
            props.history.push("/")
        });
        }}>{username}</h3>
            Characters
        </div>
    )
}

export default Characters
