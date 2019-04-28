/* eslint-disable consistent-return */
import Authenticator from './authenticate';
import userModel from '../models/userData';

const { verifyToken } = Authenticator;

class Authorization {
  static verifyUser(req, res, next) {
    const token = req.headers.token || req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unathorised entry',
      });
    }
    try {
      const decodedToken = verifyToken(token);
      const user = userModel.find(users => users.email === req.body.email);


      if (!user) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid or No token provided',
        });
      }
      req.user = decodedToken;
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error,
      });
    }
    next();
  }
}


export default Authorization;
