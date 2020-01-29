/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import Joi from 'joi';

const name = Joi.string()
  .regex(/^[a-zA-Z]+$/)
  .lowercase()
  .trim()
  .required()
  .error((errors) => {
    errors.forEach((err) => {
      switch (err.type) {
        case 'string.regex.base':
          err.message = 'Name can only contain letters';
          break;
        default:
          break;
      }
    });
    return errors;
  });

const email = Joi.string()
  .trim()
  .strict()
  .lowercase()
  .email()
  .required();

const password = Joi.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
  .required()
  .error((errors) => {
    errors.forEach((err) => {
      switch (err.type) {
        case 'string.regex.base':
          err.message = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and must be 8 characters long';
          break;
        default:
          break;
      }
    });
    return errors;
  });
const createUser = (user) => {
  const schema = Joi.object().keys({
    email,
    firstName: name,
    lastName: name,
    password,
    address: Joi.string()
      .trim()
      .required(),
    status: Joi.string()
      .insensitive()
      .default('unverified'),
    isAdmin: Joi.boolean().default(false),
  });
  return Joi.validate(user, schema);
};
const createLogin = (user) => {
  const schema = Joi.object().keys({
    email,
    password,
  });
  return Joi.validate(user, schema);
};
const createLoan = (loan) => {
  const schema = Joi.object().keys({
    tenor: Joi.number()
      .integer()
      .strict()
      .min(1)
      .max(12)
      .required(),
    amount: Joi.number()
      .positive()
      .min(5000)
      .required(),
  });
  return Joi.validate(loan, schema);
};

const createRepayment = (repayment) => {
  const schema = Joi.object().keys({
    paidAmount: Joi.number()
      .positive()
      .required(),
  });
  return Joi.validate(repayment, schema);
};

const loanQuery = (loan) => {
  const schema = Joi.object().keys({
    status: Joi.string()
      .insensitive()
      .valid('approved'),
    repaid: Joi.boolean()
      .insensitive()
      .valid([true, false]),
  });
  return Joi.validate(loan, schema);
};

const approveLoan = (loan) => {
  const schema = Joi.object().keys({
    status: Joi.string()
      .insensitive()
      .valid(['approved', 'rejected'])
      .required(),
  });
  return Joi.validate(loan, schema);
};

const getUserId = (id) => {
  const schema = {
    id: Joi.string()
      .regex(/^\d+$/)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'string.regex.base':
              err.message = 'ID must be a positive integer';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  return Joi.validate(id, schema);
};
const getUserEmail = (user) => {
  const schema = {
    email,
  };

  return Joi.validate(user, schema);
};

module.exports = {
  createUser,
  createLogin,
  createLoan,
  createRepayment,
  loanQuery,
  approveLoan,
  getUserId,
  getUserEmail,
};
