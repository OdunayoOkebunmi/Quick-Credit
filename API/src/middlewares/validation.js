import Joi from 'joi';

class Validate {
  /**
   * @param {user} object
   */

  static validateUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().lowercase()
        .required(),
      firstName: Joi.strict().regex(/^[A-Z]|[a-z]+$/).required(),
      lastName: Joi.strict().regex(/^[A-Z]|[a-z]+$/).required(),
      password: Joi.string().min(7).required().strict(),
      address: Joi.string().trim().required(),
      status: Joi.string().default('unverified'),
      isAdmin: Joi.boolean().default(false),

    });
    return Joi.validate(user, schema);
  }
}

export default Validate;
