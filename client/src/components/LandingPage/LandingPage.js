import React, { useEffect, useState } from "react";
import auth from "../../logic/auth";

const LandingPage = (props) => {
  const [username, setUsername] = useState("nouser");

  const checkUser = async () => {
    await auth.updateUser();
  };

  useEffect(() => {
    checkUser();
    setTimeout(setUsername(auth.user), 1000);
  }, []);
  return (
    <div>
      <h1>R99</h1>
      <h3>{username}</h3>
      <button onClick={() => {}}>Create Campaign</button>
      <button onClick={() => {}}>Create Character</button>
      <br />
      <input type="text" />
      <button onClick={() => {}}>Join Room</button>
    </div>
  );
};

export default LandingPage;
