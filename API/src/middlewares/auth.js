/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userData';

dotenv.config();

class Auth {
  /**
  * Generate Token
  * @param {number} id
  * @param {string} token
  */
  static generateToken(id) {
    const token = jwt.sign(
      {
        id,
      },
      process.env.SECRET, { expiresIn: '7d' },
    );
    return token;
  }

  /**
   * Verify Token
   * @param {object}req
   * @param {object} res
   * @param {function} next
   */
  static verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if user provides a token
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unathorized entry',
      });
    }

    // check if token is valid
    try {
      // decode and get token
      const decodedToken = jwt.verify(token, process.env.SECRET);

      // find user by email
      const user = userModel.find(user_ => user_.email === req.body.email);

      // ceheck if user exist
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid token provided',
        });
      }
      req.user = decodedToken;
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    next();
  }
}
export default Auth;
