import express from "express";
import * as userControllers from "./../controllers/user-controller.js";

const router = express.Router();

router.route('/user')
    .post(userControllers.post)
    .get(userControllers.index);

export default router;