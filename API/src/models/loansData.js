import db from '../migrations/db';

/**
 * @exports Loans
 * @class User
 */

class Loans {
  /**
 * @param {*} data
 * @returns { object } user object
 */
  static applyForLoans(data) {
    const queryText = `INSERT INTO loans(
    email,"firstName","lastName", status, tenor,amount,balance,interest, "paymentInstallment", repaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
    const {
      email, firstName, lastName,
      status, tenor, amount, balance,
      interest, paymentInstallment, repaid,
    } = data;

    const values = [email, firstName, lastName,
      status, tenor, amount, balance,
      interest, paymentInstallment, repaid];
    const response = db.query(queryText, values);
    return response;
  }

  /**
  * @param {*} email
  * @returns { object } user object
  */

  static findLoansByEmail(email) {
    const queryText = 'SELECT * FROM loans WHERE email=$1';
    const response = db.query(queryText, [email]);
    return response;
  }

  /**
  * @method getAll
  * @description Finds and returns all loans in the database
  * @returns {object} the loans details
  */
  static getAllLoans() {
    const queryText = 'SELECT * FROM loans';
    const response = db.query(queryText);
    return response;
  }

  /**
  * @method getQueriedLoans
  * @description Finds and returns all loans in the database  using specific queries
  * @returns {object} the loans details
  */
  static getQueriedLoans(status, repaid) {
    const queryText = 'SELECT * FROM loans WHERE status=$1 AND repaid=$2';
    const response = db.query(queryText, [status, repaid]);
    return response;
  }

  /**
 * @method getOneLoan
 * @description Finds and returns a specific loan
 * @returns {object} the loans details
 */
  static getOneLoan(id) {
    const queryText = 'SELECT * FROM loans WHERE id=$1';
    const response = db.query(queryText, [id]);
    return response;
  }


  /**
 * @method approveLoan
 * @description admin approves or rejects a loan
 * @returns {object} the loans details
 */
  static approveLoan(status, id) {
    const queryText = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING id, amount, tenor, status, "paymentInstallment", interest';
    const response = db.query(queryText, [status, id]);
    return response;
  }
}
export default Loans;
