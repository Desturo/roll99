import express from 'express';
import { createCampaign } from '../controllers/campaign.controller.js';

const router = express.Router();

router.post('/', createCampaign);

export default router;