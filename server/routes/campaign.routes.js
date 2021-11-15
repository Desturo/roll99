import express from "express";
import {
  createCampaign,
  addPlayer,
  getUsersCampaigns,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.post("/", createCampaign);

router.post("/players", addPlayer);

router.get("/", getUsersCampaigns);

export default router;
