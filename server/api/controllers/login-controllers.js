import { request, response } from 'express';
import * as userService from './../services/signup-services.js';
import model from '../models/signup.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
}

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
}


export const post = async (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for existing user
  model.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const token = jwt.sign({ id: user.id }, 'mysecret', { expiresIn: "10h" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const sessUser = { id: user.id, name: user.name, email: user.email };
      req.session.user = sessUser; // Auto saves session data in mongo store
      res.cookie('token', token, {
        maxAge: 7200000,
        secure: false,
        httpOnly: true,
      })

      res.json({ msg: "Logged In Successfully", id: user.id, name: user.name, email: user.email, token }); // sends cookie with sessionID automatically in response
    });
  });
}

export const update = async (request, response) => {

  try {
    const id = request.params.id;
    const updated = { ...request.body };
    updated.id = id;
    const contact = await userService.update(updated);
    setSuccessResponse(contact, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}