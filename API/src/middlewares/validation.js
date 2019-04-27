import Joi from 'joi';

class Validate {
  /**
   * @param {user} object
   */

  static validateUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      firstName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Z]|[a-z]+$/)
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
}

export default Validate;
