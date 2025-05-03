import { Router } from 'express';
import { getRecommendations } from '../controllers/recommendation.controller.js';

const router = Router();


router.route("/recommend-gpu").post(getRecommendations);


export default router