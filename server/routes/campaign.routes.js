import express from "express";
import {
  createCampaign,
  addPlayer,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.post("/", createCampaign);

router.post("/players", addPlayer);

export default router;
