import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

class Authenticator {
  /**
  * Generate Token
  * @param {number} id
  * @param {string} token
  */
  static generateToken(id) {
    const token = jwt.sign(
      {
        id,
      },
      process.env.SECRET, { expiresIn: '7d' },
    );
    return token;
  }

  /**
   * @description Decodes the access token
   * @param {string} token - The access token
   * @returns {object} payload - the decoded access token
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRETKEY);
  }

  /**
    * Hash Password Method
    * @param {string} Password
    * @returns {string} returns hashed password
    */


  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
     * compare Password
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
export default Authenticator;
