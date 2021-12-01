import CampaingModel from "../models/campaigns.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import CodeModel from "../models/codes.model.js";
import UserModel from "../models/user.model.js";

//Create campaign in Database. Get's Name of Campaign and ID of the creating Gammaster in the req body
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

export const getUsersCampaigns = (req, res) => {
  let campaignPlayers = [];
  let returnCampaigns = [];
  jwt.verify(
    req.cookies.jwToken,
    process.env.ACCESS_TOKEN_SECERET,
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        CampaingModel.find((err, docs) => {
          if (err) {
            console.log(err);
          } else {
            docs.map((campaign) => {
              campaignPlayers.push({
                name: campaign.campaignName,
                id: campaign.id,
                code: campaign.code,
                players: campaign.players,
              });
            });
            UserModel.findOne({ username: user.username }, (error, user) => {
              if (error) {
                console.log(error);
              } else {
                campaignPlayers.map((campaignData) => {
                  if (campaignData.players.includes(user.id)) {
                    returnCampaigns.push({
                      campaignName: campaignData.name,
                      campaignID: campaignData.id,
                      campaignCode: campaignData.code,
                    });
                  }
                });
                res.json({ campaigns: returnCampaigns });
              }
            });
          }
        });
      }
    }
  );
};

export const addPlayer = (req, res) => {
  CampaingModel.findOne({ code: req.body.campaignID }, (err, campaign) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.send("Campaign not found");
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
        res.status(200);
        return res.send("Player is already in the campaign");
      }
    }
  });
};
