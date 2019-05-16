/* eslint-disable no-unused-vars */
import Joi from 'joi';

const name = Joi.string()
  .regex(/^[A-Z]|[a-z]+$/)
  .min(3)
  .max(30)
  .required();

const email = Joi.string()
  .email()
  .required();

const password = Joi.string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .min(7)
  .alphanum()
  .required();

const createUser = (user) => {
  const schema = Joi.object().keys({
    email,
    firstName: name,
    lastName: name,
    password,
    address: Joi.string().required(),
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
    email,
    tenor: Joi.number()
      .integer()
      .min(1)
      .max(12)
      .required(),
    amount: Joi.number().min(5000).required(),
  });
  return Joi.validate(loan, schema);
};

const createRepayment = (repayment) => {
  const schema = Joi.object().keys({
    paidAmount: Joi.number().required(),
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

const loanApproval = (loan) => {
  const schema = Joi.object().keys({
    status: Joi.string()
      .insensitive()
      .valid(['approved', 'rejected'])
      .required(),

  });
  return Joi.validate(loan, schema);
};

const userId = (id) => {
  const schema = {
    id: Joi
      .number()
      .required(),
  };

  return Joi.validate(id, schema);
};
const userEmail = (user) => {
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
  loanApproval,
  userId,
  userEmail,
};
