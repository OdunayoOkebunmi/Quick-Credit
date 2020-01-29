/* eslint-disable consistent-return */
import Authenticator from './authenticate';

const { verifyToken } = Authenticator;

class Authorization {
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;

      if (!req.user.isAdmin) {
        return res.status(403).send({
          error: 'Only Admin can access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        error: 'Invalid or No token provided',
      });
    }
  }

  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;
      if (req.user.isAdmin) {
        return res.status(403).send({
          error: 'Only Authenticated User can access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        error: 'Invalid or No token provided',
      });
    }
  }
}

export default Authorization;
