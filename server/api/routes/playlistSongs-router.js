import express from "express";
import * as playlistSongsControllers from "./../controllers/playlistSongs-controller.js";

const router = express.Router();

router.route('/playlist/:id/songs')
    .post(playlistSongsControllers.post)
    .get(playlistSongsControllers.index);

router.route('/playlist/:id/songs/:songsId')
    .delete(playlistSongsControllers.remove);

export default router;