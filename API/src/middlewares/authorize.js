/* eslint-disable consistent-return */
import Authenticator from './authenticate';

const { verifyToken } = Authenticator;

class Authorization {
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      const adminEmail = decoded.payload.email;
      // console.log(decoded.payload.email);
      if (!(adminEmail.endsWith('quickcredit.com'))) {
        return res.status(403).send({
          status: 403,
          error: 'Only Admin can access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid or No token provided',
      });
    }
  }

  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      const userEmail = decoded.payload.email;
      if (userEmail.endsWith('quickcredit.com')) {
        return res.status(403).send({
          status: 403,
          error: 'Only Authenticated User can access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid or No token provided',
      });
    }
  }
}


export default Authorization;
