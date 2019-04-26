import Validate from '../middlewares/validation';
import Auth from '../middlewares/auth';
import Helper from '../middlewares/helper';
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

      const hashPassword = Helper.hashPassword(req.body.password);
      const token = Auth.generateToken(userModel[0].id);
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
}

export default UserController;
