import React, { useEffect, useState } from 'react'
import auth from '../../logic/auth';

const CreateCampaign = (props) => {
    const [username, setUsername] = useState("nouser");

    const checkUser = async () => {
        await auth.updateUser();
        setUsername(auth.user);
    };

    useEffect(() => {
        checkUser();
    }, [])
    return (
        <div>
            <h3 style={ {cursor: "pointer"}} onClick={() => {
            auth.logout(() => {
            props.history.push("/")
        });
        }}>{username}</h3>
        <h1>Create Campaigns</h1>
        
        </div>
    )
}

export default CreateCampaign
