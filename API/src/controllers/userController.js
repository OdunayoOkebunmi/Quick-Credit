/* eslint-disable no-unused-vars */
import Authenticator from '../middlewares/authenticate';
import userModel from '../models/userData';
import EmailHandler from '../helper/emailHandler';
import MessageHandler from '../helper/emailMessageHandler';


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

    // check if user already exists
    const emailExist = userModel.find(user => user.email === email);
    if (emailExist) {
      return res.status(409).json({

        error: 'User already exist',
      });
    }

    const id = userModel.length + 1;
    const isAdmin = false;
    const status = 'unverifed';
    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    const responseData = {
      token,
      id,
      email,
      firstName,
      lastName,
      address,
      status,
      isAdmin,
    };
    const data = {
      ...responseData,
      password: Authenticator.hashPassword(password),
    };

    userModel.push(data);
    // send email to user
    // const emailData = MessageHandler.signupMessage(data);
    // EmailHandler.sendNotif(emailData);

    return res.status(201).json({

      data: responseData,
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
      return res.status(404).json({
        error: 'User with the email does not exist',
      });
    }
    const {
      id, firstName, lastName, isAdmin,
    } = userExists;

    // checks if password matches
    if (!Authenticator.comparePassword(userExists.password, password)) {
      return res.status(400).json({
        error: 'Invalid password/email',
      });
    }
    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    return res.status(200).json({
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

        error: 'User with this email not found!',
      });
    }

    if (userData.status === 'verified') {
      return res.status(409).json({

        message: 'User has already been verified',
      });
    }
    userData.status = 'verified';
    const updatedData = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      status: userData.status,
    };
    return res.status(200).json({
      data: updatedData,
    });
  }
}

export default UserController;
