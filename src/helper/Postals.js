/* eslint-disable import/prefer-default-export */
import sendgridMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

export const Postals = async (recipient, sender, emailSubject, content) => {
  const message = {
    to: recipient,
    from: sender,
    subject: emailSubject,
    html: content,
  };
  return sendgridMail.send(message).then(() => {
    console.log('Message sent');
  }).catch((error) => {
    console.log(error.response.body);
    // console.log(error.response.body.errors[0].message)
  });
};
