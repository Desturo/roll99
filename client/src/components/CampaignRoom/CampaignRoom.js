import React, { useEffect } from "react";
import auth from "../../logic/auth";
import * as api from "../../api/index";

const CampaignRoom = ({ match }) => {
  const campaignID = match.params.campaignID;
  const checkUser = async () => {
    await auth.updateUser();
    api.addPlayerToCampaign({ campaignID, userID: auth.userID });
  };
  useEffect(() => {
    checkUser();
  }, []);

  return <div>{campaignID}</div>;
};

export default CampaignRoom;
