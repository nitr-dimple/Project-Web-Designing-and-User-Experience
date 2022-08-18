import nodemailer from 'nodemailer';
import { secret, user, pass } from './config.js';

const transport = nodemailer.createTransport({
    service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail =(name, email)=>{
    console.log("Check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Email Confirmation - TUNE",
    html: `<p>Hello ${name},</p>
            <p>Thank you for Registering with us.</p>`,
  }).catch(err => console.log(err));
}