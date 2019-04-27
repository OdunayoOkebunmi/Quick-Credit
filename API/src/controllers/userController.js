import Validate from '../middlewares/validation';
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
    const { error } = Validate.validateUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }
    try {
      // check if user already exists
      const emailExits = userModel.find(user => user.email === req.body.email);

      if (emailExits) {
        return res.status(409).json({
          status: 409,
          error: 'User already exist',
        });
      }

      const hashPassword = Authenticator.hashPassword(req.body.password);
      const token = Authenticator.generateToken(userModel[0].id);
      const data = {
        token,
        id: userModel.length + 1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        status: 'unverified',
        isAdmin: false,
      };
      userModel.push(data);

      return res.status(201).json({
        status: 201,
        data,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: 'Sorry, something went wrong',
      });
    }
  }

  /**
   * Login User
   * @param {object} req
   * @param {object} res
   */

  static loginUser(req, res) {
    const { error } = Validate.validateLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }

    const userExists = userModel.find(user => user.email === req.body.email);

    if (!userExists) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }

    const hashedPassword = userExists.password;
    if (!Authenticator.comparePassword(hashedPassword, req.body.password)) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid password/email',
      });
    }
    const token = Authenticator.generateToken(userModel[0].id);
    return res.status(200).json({
      status: 200,
      token,
      id: userExists.id,
      email: userExists.email,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
    });
  }
}

export default UserController;
