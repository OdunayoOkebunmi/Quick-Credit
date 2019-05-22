import Authenticator from '../middlewares/authenticate';
import db from '../migrations/db';


/**
 * @exports User
 * @class User
 */
class User {
  /**
  * @param {*} data
  * @returns { object } user object
  */
  static createUserData(data) {
    try {
      const queryText = `INSERT INTO users(
      "firstName", "lastName", email, password, address) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
      const {
        firstName, lastName, email, password, address,
      } = data;
      const hashedPassword = Authenticator.hashPassword(password);
      const values = [firstName, lastName, email, hashedPassword, address];
      const response = db.query(queryText, values);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * @param {*} email
   * @returns { object } user object
   */

  static findByEmail(email) {
    try {
      const queryText = 'SELECT * FROM users WHERE email=$1';
      const response = db.query(queryText, [email]);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
  * @param {*} email
  * @returns { object } user object
  */
  static verifyUser(email) {
    try {
      const queryText = "UPDATE users SET status='verified' WHERE email=$1";
      const response = db.query(queryText, [email]);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
  * @param {*} email
  * @returns { object } user object
  */
}

export default User;
