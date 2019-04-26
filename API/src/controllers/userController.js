// import moment from 'moment';
import uuid from 'uuid';
import Validate from '../middlewares/validation';
import Auth from '../middlewares/auth';
import Helper from '../middlewares/helper';
import models from '../models/dummyData';

class UserController {
  /**
  *
  * @param {req} object
  * @param {res} object
  * @returns {json} json
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
      const emailExits = models.Users.find(user => user.email === req.body.email);

      if (emailExits) {
        return res.status(409).json({
          status: 409,
          error: 'User already exist',
        });
      }

      const hashPassword = Helper.hashPassword(req.body.password);

      const data = {
        id: uuid.v4(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        status: 'unverified',
        isAdmin: req.body.isAdmin,
      };
      models.Users.push(data);
      const token = Auth.generateToken(models.Users[0].id);

      return res.status(201).json({
        status: 201,
        data: [
          {
            token,
            data,
          },
        ],
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
