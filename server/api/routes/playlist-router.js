import express from "express";
import * as playlistControllers from "./../controllers/playlist-controller.js";

const router = express.Router();

router.route('/user/:id/playlist')
    .post(playlistControllers.post)
    .get(playlistControllers.index);

router.route('/user/:userId/playlist/:id')
    .get(playlistControllers.get)
    .put(playlistControllers.update)
    .delete(playlistControllers.remove);

export default router;