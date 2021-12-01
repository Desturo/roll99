import React, { useEffect, useState } from "react";
import auth from "../../logic/auth";
import * as api from "../../api/index";
import { socket } from "../../services/socket";

const CampaignRoom = ({ match }) => {
  const campaignID = match.params.campaignID;
  const checkUser = async () => {
    await auth.updateUser();
    api.addPlayerToCampaign({ campaignID, userID: auth.userID });
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("effect");
    socket.emit("joinRoom", campaignID);
    checkUser();
    socket.off("message").on("message", (data) => {
      setMessages((messages) => [...messages, data.messages]);
      console.log(data);
    });
    return () => socket.emit("leaveRoom", campaignID);
  }, []);

  return (
    <>
      <div>{campaignID}</div>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        autoComplete="off"
      />
      <button
        onClick={() => {
          socket.emit("roomMessage", {
            roomCode: campaignID,
            message: message,
            username: auth.user,
          });
          setMessage("");
        }}
      >
        Send
      </button>
      <div>{messages}</div>
      {/*<ul>
        {messages.map((message) => (
          <li key={message.message}>{message.user}</li>
        ))}
      </ul>*/}
    </>
  );
};

export default CampaignRoom;
