import express from "express";
import * as userControllers from "./../controllers/login-controllers.js";
import bcrypt from 'bcrypt';
import model from '../models/signup.js';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.route('/login')
.post(userControllers.post);

router.route('/forgotpassword/:id')
.put(userControllers.update)

export default router;