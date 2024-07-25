import express from "express";
import { getLikes, getUserProfileAndRepo, likeProfile } from "../controller/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepo);
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;