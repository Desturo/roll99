import CampaingModel from "../models/campaigns.model.js";
import crypto from "crypto";
import CodeModel from "../models/codes.model.js";

export const createCampaign = async (req, res) => {
  const campaignName = req.body.campaignName;

  const gamemaster = req.body.gamemaster;

  const code = crypto.randomBytes(4).toString("hex");

  const newCampaign = new CampaingModel({ campaignName, gamemaster, code });

  CodeModel.findOne({ code }, (err, code) => {
    if (err) {
      return console.log(err);
    } else {
      try {
        newCampaign.save((camaignError) => {
          if (camaignError) return console.log(camaignError);
        });
        const newCode = new CodeModel({ code });

        newCode.save((codeError) => {
          if (codeError) return console.log(codeError);
        });

        res.status(201);
      } catch (error) {
        res.status(500);
      }
    }
  });

  res.sendStatus(200);
};

export const addPlayer = (req, res) => {
  CampaingModel.findOne({ code: req.body.campaignID }, (err, campaign) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      if (!campaign.players.includes(req.body.userID)) {
        campaign.players.push(req.body.userID);
        campaign.save((saveError) => {
          if (saveError) {
            res.status(500);
            return res.send("Couldn't add palyer to Campaign");
          } else {
            res.status(200);
            return res.send("Added player to Campaign");
          }
        });
      } else {
        res.status(400);
        return res.send("Player is already in the campaign");
      }
    }
  });
};
