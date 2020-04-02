import { verifyToken } from './authenticate';

export const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded.payload;
    return next();
  } catch (error) {
    return res.status(401).send({
      error: 'Invalid or No token provided',
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  const { user: { isAdmin } } = req;
  if (!isAdmin) {
    return res.status(403).json({
      error: 'Only Admin can access this route',
    });
  }
  return next();
};
