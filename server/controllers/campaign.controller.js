import CampaingModel from "../models/campaigns.model.js"
import crypto from "crypto"
import CodeModel from "../models/codes.model.js";

export const createCampaign = async (req, res) => {
    const campaignName = req.body.campaignName;

    const gamemaster = req.body.gamemaster;

    const code = crypto.randomBytes(4).toString('hex');

    const newCampaign = new CampaingModel({campaignName, gamemaster, code})

    CodeModel.findOne({code: "708aac19"}, (err, code) => {
        if(err) return console.log(err);

        //console.log(code);
    })

    try {
        newCampaign.save((camaignError) => {
            if(camaignError) return console.log(camaignError);
        })
        const newCode = new CodeModel({code})

        newCode.save((codeError) => {
            if(codeError) return console.log(codeError);
        })

        res.status(201);
    } catch (error) {
        res.status(500);
    }

    res.sendStatus(200);
}