// import Validate from '../middlewares/validation';
import Authenticator from '../middlewares/authenticate';
import userModel from '../models/userData';

class UserController {
  /**
  *
  * @param {object} req
  * @param {object} res
  * @returns {object} user object
   * @memberof UserController
  */
  static createUser(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const id = userModel.length + 1;
    const status = 'unverified';
    const isAdmin = false;

    const token = Authenticator.generateToken({
      id,
      email,
      isAdmin,
    });
    const data = {
      token,
      id,
      email,
      firstName,
      lastName,
      password: Authenticator.hashPassword(password),
      address,
      status,
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

    return res.status(201).json({
      status: 201,
      data,
    });
  }

  /**
   * Login User
   * @param {object} req
   * @param {object} res
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

    const hashedPassword = userExists.password;

    // checks if password matches
    if (!Authenticator.comparePassword(hashedPassword, password)) {
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
    * Verify User
    * @param {object} req
    * @param {object} res
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
      isAdmin: userData.isAdmin,
    };
    return res.status(200).json({
      status: 200,
      data: updatedData,
    });
  }
}

export default UserController;
