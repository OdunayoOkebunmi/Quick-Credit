import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class EmailHandler
 * @description Handles sending of mails
 * @param {Object} mailData Mail Details
 * @exports EmailHandler
 */

class EmailHandler {
  /**
    * @method notify
    * @description sends an email notification to the specified email
    * @param {object} message - The email address, subject & body
    * @returns {*} nothing
    */
  static sendNotif(message) {
    const response = message;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },

    });
    const mailOptions = {
      from: 'okebunmi13odunayo@gmail.com',
      to: response.email,
      subject: response.subject,
      html: response.body,
    };
    transporter.sendMail(mailOptions, (err, info) => (err ? console.log(err) : console.log(info)));
  }
}

export default EmailHandler;
