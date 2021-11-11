import React, { useEffect, useState } from 'react'
import auth from '../../logic/auth';
import * as api from "../../api/index"

const CreateCampaign = (props) => {
    const [username, setUsername] = useState("nouser");

    const [campaignName, setCampaignName] = useState("")

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
        <h1>Create Campaign</h1>
        <input type="text" value={campaignName} placeholder="CampaingName" onChange={(e) => {
            setCampaignName(e.target.value)
        }}/>
        <button onClick={() => {
            api.createCampaign({ campaignName: campaignName });
            setCampaignName("")
        }} >Create Campaing</button>
        </div>
    )
}

export default CreateCampaign
