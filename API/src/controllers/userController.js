/* eslint-disable no-unused-vars */
import Authenticator from '../middlewares/authenticate';
import userModel from '../models/userData';
import EmailHandler from '../helper/emailHandler';
import MessageHandler from '../helper/messageHandler';


class UserController {
  /**
    * create new user
    * @param {object} request express request object
    * @param {object} response express response object
    *
    * @returns {json} json
    * @memberof UserController
    */
  static createUser(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const details = req.body;
    const id = userModel.length + 1;
    const isAdmin = false;
    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    const data = {
      token,
      id,
      ...details,
      password: Authenticator.hashPassword(password),
      status: 'unverified',
      isAdmin,
    };

    // check if user already exists
    const emailExist = userModel.find(user => user.email === email);
    if (emailExist) {
      return res.status(409).json({
        status: 409,
        error: 'User already exist',
      });
    }
    userModel.push(data);
    // send email to user
    const emailData = MessageHandler.signupMessage(data);
    EmailHandler.sendNotif(emailData);


    return res.status(201).json({
      status: 201,
      data,
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
  static loginUser(req, res) {
    const { email, password } = req.body;
    // checks if user exists
    const userExists = userModel.find(user => user.email === email);
    if (!userExists) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email',
      });
    }
    const {
      id, firstName, lastName, isAdmin,
    } = userExists;

    // checks if password matches
    if (!Authenticator.comparePassword(userExists.password, password)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid password/email',
      });
    }
    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    return res.status(200).json({
      status: 200,
      data: {
        token,
        id,
        firstName,
        lastName,
        isAdmin,
        email: userExists.email,
      },
    });
  }

  /**
  * check if a user is verified
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  * @memberof UserController
  */
  static adminVerifyUser(req, res) {
    const { email } = req.params;
    const userData = userModel.find(user => user.email === email);
    // if user is not found
    if (!userData) {
      return res.status(404).send({
        status: 404,
        error: 'User with this email not found!',
      });
    }

    if (userData.status === 'verified') {
      return res.status(409).json({
        status: 409,
        message: 'User has already been verified',
      });
    }
    userData.status = 'verified';
    const updatedData = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      address: userData.address,
      status: userData.status,
    };
    return res.status(200).json({
      status: 200,
      data: updatedData,
    });
  }
}

export default UserController;
