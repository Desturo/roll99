import React, { useEffect, useState } from "react";
import auth from "../../logic/auth";

const LandingPage = (props) => {
  const [username, setUsername] = useState("nouser");

  const checkUser = async () => {
    await auth.updateUser();
    setUsername(auth.user)
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      <h1>R99</h1>
      <h3 style={ {cursor: "pointer"}} onClick={() => {
        auth.logout(() => {
          props.history.push("/")
        });
      }}>{username}</h3>
      <ul>
        <li style={ {cursor: "pointer"}}>Campaign Manager</li>
        <li style={ {cursor: "pointer"}} onClick={() => {
          props.history.push("/characters")
        }}>My Characters</li>
        <li style={ {cursor: "pointer"}}>My Campaigns</li>
      </ul>
      <button onClick={() => {}}>Create Campaign</button>
      <button onClick={() => {props.history.push("/characters/create")}}>Create Character</button>
      <br />
      <input type="text" />
      <button onClick={() => {}}>Join Room</button>
    </div>
  );
};

export default LandingPage;
