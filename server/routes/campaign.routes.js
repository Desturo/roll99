import express from 'express';
import { tets } from '../controllers/campaign.controller.js';

const router = express.Router();

router.get('/', tets);

export default router;