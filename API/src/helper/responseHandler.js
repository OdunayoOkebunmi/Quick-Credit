/* eslint-disable max-len */
import Debug from 'debug';

const debug = Debug('dev');

export const errorResponse = (res, status, error) => res.status(status).json({
  errors: error,
});

export const successResponse = (res, status, key, data) => res.status(status).json({
  [key]: data,
});

export const serverErrorResponse = (err, req, res) => res.status(err.status || 500).json({
  errors: {
    message:
      'Something went wrong, please try again or check back for a fix',
  },
});


export const developmentServerErrorResponse = (err, req, res) => {
  debug(err.stack);
  return res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: err,
    },
  });
};
