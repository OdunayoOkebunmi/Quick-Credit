
import { check, validationResult } from 'express-validator';

const LoanValidation = {
  createLoan: [
    check('tenor')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Tenor is required'),
    check('amount')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Amount is required')
      .isNumeric()
      .withMessage('Amount should be a number')
      .trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
  loanApproval: [
    check('status')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Tenor is required')
      .isIn(['approved', 'pending', 'rejected'])
      .withMessage('Status not in "approved", "rejected","pending"')
      .trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
};
export default LoanValidation;
