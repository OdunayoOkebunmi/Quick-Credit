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
    const queryText = `INSERT INTO users(
  "firstName", "lastName", email, password, address
) VALUES ($1, $2, $3, $4, $5) RETURNING *;
`;
    const {
      firstName, lastName, email, password, address,
    } = data;
    const hashedPassword = Authenticator.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword, address];
    const response = db.query(queryText, values);
    return response;
  }

  /**
   * @param {*} email
   * @returns { object } user object
   */

  static findByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(queryText, [email]);
    return response;
  }

  /**
   * @param {*} id
   * @returns { object } user object
   */
  static findById(id) {
    const queryText = 'SELECT * FROM users WHERE id=$1';
    const response = db.query(queryText, [id]);
    return response;
  }

  /**
  * @param {*} email
  * @returns { object } user object
  */
  static verifyUser(email) {
    const queryText = "UPDATE users SET status='verified' WHERE email=$1";
    const response = db.query(queryText, [email]);
    return response;
  }
}

export default User;
