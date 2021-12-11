const express = require('express');
const {
  createCampaign,
  addPlayer,
  getUsersCampaigns,
} = require("../controllers/campaign.controller.js");

const router = express.Router();

router.post("/", createCampaign);

router.post("/players", addPlayer);

router.get("/", getUsersCampaigns);

module.exports = router;
