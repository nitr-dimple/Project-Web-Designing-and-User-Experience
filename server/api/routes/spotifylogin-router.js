import express from "express";
import * as loginControllers from "../controllers/spotify-login-controller.js";

const router = express.Router();

router.route('/spotifylogin')
    .post(loginControllers.post);

router.route('/refresh')
    .post(loginControllers.refresh);

router.route('/lyrics')
    .get(loginControllers.lyrics);
export default router;