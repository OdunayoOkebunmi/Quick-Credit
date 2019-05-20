import db from '../migrations/db';

/**
 * @exports Loans
 * @class Loans
 */

class Repayments {
  /**
 * @param {*} data
 * @returns { object } user object
 */
  static findLoanId(id) {
    const queryText = 'SELECT * FROM repayments WHERE "loanId"=$1';
    const response = db.query(queryText, [id]);
    return response;
  }

  /**
  * @param {*} data
  * @returns { object } user object
  */
  static postLoans(id, amount) {
    const queryText = `INSERT INTO repayments("loanId", amount)
                         VALUES($1, $2) RETURNING *`;
    const response = db.query(queryText, [id, amount]);
    return response;
  }
}

export default Repayments;
