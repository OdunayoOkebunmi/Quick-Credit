import Authenticator from './authenticate';

const { verifyToken } = Authenticator;

class Authorization {
  static verifyUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    // check if user provides a token
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unathorized entry',
      });
    }
    try {
      const decodedToken = verifyToken(token);

      // find user by email
      req.user = decodedToken.id;

      if (!req.user.id) {
        return res.status(403).send({
          status: 403,
          error: 'Only Authenticated User can access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}


export default Authorization;
