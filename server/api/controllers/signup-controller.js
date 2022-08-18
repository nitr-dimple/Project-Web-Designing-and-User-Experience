import { request, response } from 'express';
import * as userService from './../services/signup-services.js';
import model from '../models/signup.js';
import bcrypt from 'bcrypt'
import * as sc from '../nodemailer.config.js'

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}


export const postUser = async (req, res) => {

	const { name, email, password } = req.body;
    if (!name ) {
         
         return res.status(400).json({status:'error', error: "Please enter Name" });
      }
      if (!email) {
        
        return res.status(400).json({status:'error', error: "Please enter Email" });
     }
     if (!password) {
        return res.status(400).json({status:'error', error: "Please enter Password" });
    }
    
       if (password.length < 6) {
        
        return res.status(400).json({status:'error', error: "Password should be atleast 6 characters long" });
      }
    model.findOne({email: email}).then((user)=>{
        if(user) return res.status(400).json({status:'error', error:"User already exists"});

        const newUser = new model({
            name,
            email,
            password
        });
        bcrypt.genSalt(12,(err,salt)=>
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err) throw err;

        newUser.password = hash;
        userService.save(newUser).then(
        res.json({
             msg:"Successfully Registered"
        })

        
    )
    
        .catch((err)=>console.log(err))
    })

   )
   sc.sendConfirmationEmail(name, email);

 })
}

