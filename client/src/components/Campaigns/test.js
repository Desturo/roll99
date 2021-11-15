import React, { useState, useEffect } from 'react'

import * as api from "../../api/index.js";

const Campaigns = () => {
    const [campaignsArray, setCampaignsArray] = useState([]);

    const checkCampaigns = async () => {
        //Returns a list of Objects (e.g. [{campaignID: <MongoDB Object ID>, campaignName: <Name of Campaign>}])
        const { data: { campaigns }, } = await api.getUserCampaigns();


        setCampaignsArray(campaigns);
      };    

      useEffect(() => {
        checkCampaigns();
      }, []);

    return (
        <div>
            <ul>
            {campaignsArray.map((campaign) => {
                return <li key={campaign.campaignID}>{campaign.campaignName}</li>;
            })}
        </ul>
        </div>
    )
}

export default Campaigns
