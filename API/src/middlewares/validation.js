import Joi from 'joi';

class Validate {
  /**
   * @param {user} object
   */

  static validateUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      firstName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
        .min(3)
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
        .min(3)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(7)
        .alphanum()
        .required(),
      address: Joi.string().required(),
      status: Joi.string()
        .insensitive()
        .default('unverified'),
      isAdmin: Joi.boolean().default(false),

    });
    return Joi.validate(user, schema);
  }

  /**
 * @param data string
 */
  static validateLogin(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().lowercase()
        .required(),
      password: Joi.string().min(7).required().strict(),
    });
    return Joi.validate(data, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateLoan(loan) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      firstName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
        .min(3)
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
        .min(3)
        .required(),
      tenor: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(),
      amount: Joi.number().required(),
    });
    return Joi.validate(loan, schema);
  }
}

export default Validate;
