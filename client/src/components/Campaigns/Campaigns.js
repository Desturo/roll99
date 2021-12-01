import React, { useEffect, useState } from "react";
import auth from "../../logic/auth";
import * as api from "../../api/index.js";

const Campaigns = (props) => {
  const [username, setUsername] = useState("nouser");

  const [campaignsArray, setCampaignsArray] = useState([
    { campaignID: "testID", campaignName: "testName" },
  ]);

  const checkUser = async () => {
    await auth.updateUser();
    setUsername(auth.user);
  };

  const checkCampaigns = async () => {
    const {
      data: { campaigns },
    } = await api.getUserCampaigns();
    setCampaignsArray(campaigns);
  };

  useEffect(() => {
    checkUser();
    checkCampaigns();
  }, []);
  return (
    <div>
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
        {campaignsArray.map((campaign) => {
          return (
            <li
              key={campaign.campaignID}
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.history.push(`/campaigns/${campaign.campaignCode}`);
              }}
            >
              {campaign.campaignName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Campaigns;
