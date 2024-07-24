import express from 'express';
import { getUserProfileAndRepo } from '../controller/user.controller.js';

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepo);

export default router;