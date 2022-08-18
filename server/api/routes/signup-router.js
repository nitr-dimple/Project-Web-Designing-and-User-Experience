import express from "express";
import * as userControllers from "./../controllers/signup-controller.js";
import bcrypt from 'bcrypt';
import model from '../models/signup.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const router = express.Router();

router.route('/register')
.post(userControllers.postUser);



router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      //delete session data from store, using sessionID in cookie
      if (err) throw err;
      res.clearCookie("session-id"); // clears cookie containing expired sessionID
      res.send({msg:"Logged out successfully"});
    });
  });

  router.get("/authchecker", (req, res) => {
    const sessUser = req.session.user;
    console.log(sessUser);
    if (sessUser) {
      return res.json({ msg: " Authenticated Successfully", sessUser });
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  });

export default router;