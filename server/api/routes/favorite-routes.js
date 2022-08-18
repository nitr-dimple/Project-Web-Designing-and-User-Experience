import express from "express";
import * as favoriteControllers from "./../controllers/favorite-controllers.js";

const router = express.Router();

router.route('/user/:userId/favorites')
.post(favoriteControllers.post)
.get(favoriteControllers.get)

router.route('/user/:userId/favorite/:id')
    .delete(favoriteControllers.remove);

export default router;