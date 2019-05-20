/* eslint-disable no-unused-vars */
import Authenticator from '../middlewares/authenticate';
import users from '../models/userData';
import EmailHandler from '../helper/emailHandler';
import MessageHandler from '../helper/emailMessageHandler';


class UserController {
  /**
    * create new user
    * @param {object} request express request object
    * @param {object} response express response object
    * @returns {json} json
    * @memberof UserController
    */
  static async createUser(req, res) {
    const findUser = await users.findByEmail(req.body.email);

    // check if user already exists
    if (findUser.rowCount > 0) {
      return res.status(409).json({
        error: 'User already exist',
      });
    }
    const response = await users.createUserData(req.body);
    if (!response) {
      return res.status(500).json({
        error: 'OOps somthing broke',
      });
    }
    const user = response.rows[0];

    const token = Authenticator.generateToken(user);

    // send email to user
    // const emailData = MessageHandler.signupMessage(data);
    // EmailHandler.sendNotif(emailData);

    return res.status(201).json({
      data: {
        token,
        ...user,
      },
    });
  }

  /**
  * log  user in
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  * @memberof UserController
  */
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const response = await users.findByEmail(email);

    // checks if user exists
    if (!response.rows[0]) {
      return res.status(404).json({
        error: 'User with the email does not exist',
      });
    }

    const verifiedPassword = Authenticator.comparePassword(response.rows[0].password, password);
    if (!verifiedPassword) {
      return res.status(400).json({
        error: 'Invalid password/email',
      });
    }
    const {
      id, firstName, lastName, isAdmin,
    } = response.rows[0];

    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    return res.status(200).json({
      data: {
        token,
        id,
        email,
        firstName,
        lastName,
        isAdmin,
      },
    });
  }

  /**
  * check if a user is verified
  * @param {object} request express request object
  * @param {object} response express response object
  * @returns {json} json
  * @memberof UserController
  */
  static async adminVerifyUser(req, res) {
    const { email } = req.params;
    const response = await users.findByEmail(email);
    // checks if user exists
    if (!response.rows[0]) {
      return res.status(404).json({
        error: 'User with the email not found',
      });
    }
    if (response.rows[0].status === 'verified') {
      return res.status(409).json({
        error: 'User has already been verified',
      });
    }
    const verifiedUser = await users.verifyUser(email);
    const updatedData = await users.findByEmail(email);
    const {
      firstName, lastName, address, status,
    } = updatedData.rows[0];
    const data = {
      email: updatedData.rows[0].email,
      firstName,
      lastName,
      address,
      status,
    };
    return res.status(200).json({
      status: 200,
      data,
    });
  }
}

export default UserController;
