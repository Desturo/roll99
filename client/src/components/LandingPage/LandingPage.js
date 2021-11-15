import React, { useEffect, useState } from "react";
import auth from "../../logic/auth";

const LandingPage = (props) => {
  const [username, setUsername] = useState("nouser");

  const [roomCode, setRoomCode] = useState("");

  const checkUser = async () => {
    await auth.updateUser();
    setUsername(auth.user);
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      <h1>R99</h1>
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        {username}
      </h3>
      <ul>
        <li style={{ cursor: "pointer" }}>Campaign Manager</li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.history.push("/characters");
          }}
        >
          My Characters
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.history.push("/campaigns");
          }}
        >
          My Campaigns
        </li>
      </ul>
      <button
        onClick={() => {
          props.history.push("/campaigns/create");
        }}
      >
        Create Campaign
      </button>
      <button
        onClick={() => {
          props.history.push("/characters/create");
        }}
      >
        Create Character
      </button>
      <br />
      <input
        type="text"
        name="rommCode"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => {
          setRoomCode(e.target.value);
        }}
      />
      <button
        onClick={() => {
          props.history.push(`/campaigns/${roomCode}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default LandingPage;
