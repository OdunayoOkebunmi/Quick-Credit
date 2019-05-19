/* eslint-disable no-unused-vars */
import moment from 'moment';
import users from '../models/userData';
import loans from '../models/loansData';

import EmailHandler from '../helper/emailHandler';
import MessageHandler from '../helper/emailMessageHandler';

class LoanController {
  /**
  * creates a loan application
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  * @memberof LoanController
  */
  static async loanApply(req, res) {
    const {
      email, firstName, lastName, tenor,
    } = req.body;

    // check if user is verifed
    const userData = await users.findByEmail(email);
    if (userData.rows.length < 1) {
      return res.status(404).send({
        error: 'User does not exist!',
      });
    }
    if (!userData) {
      return res.status(401).json({
        error: 'Email do not match! Enter the email you registered with',
      });
    }
    if (userData.rows[0].status !== 'verified') {
      return res.status(401).json({
        error: 'User not verified. You cannot apply for a loan yet',
      });
    }
    const findUserLoan = await loans.findLoansByEmail(email);
    if (!findUserLoan.rows.length || findUserLoan.rows[findUserLoan.rows.length - 1].repaid) {
      const status = 'pending';
      const repaid = false;
      const amount = parseFloat(req.body.amount).toFixed(2);
      const interest = 0.05 * parseFloat(amount).toFixed(2);
      const paymentInstallment = parseFloat((amount + interest) / tenor).toFixed(2);
      const balance = parseFloat(paymentInstallment * tenor).toFixed(2);
      const loanApplication = {
        email,
        firstName,
        lastName,
        status,
        tenor,
        amount,
        balance,
        interest: 0.05 * parseFloat(amount).toFixed(2),
        paymentInstallment,
        repaid,
      };
      const response = await loans.applyForLoans(loanApplication);
      const newLoan = response.rows[0];
      return res.status(201).json({
        data: {
          ...newLoan,
        },
      });
    }
    return res.status(409).json({
      error: 'Already applied for a loan',
    });
  }

  /**
     * gets all loan application
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns[array] array
     * @memberof LoanController
     */
  static async getAllLoans(req, res) {
    const { status } = req.query;
    let { repaid } = req.query;
    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const queriedLoans = await loans.getQueriedLoans(status, repaid);
      if (queriedLoans.rows.length === 0) {
        return res.status(200).send({
          message: 'Empty data',
        });
      }
      return res.status(200).send({
        data: queriedLoans.rows,
      });
    }
    const allLoans = await loans.getAllLoans();
    if (allLoans.rows.length === 0) {
      return res.status(200).send({
        message: 'Empty data',
      });
    }
    return res.status(200).send({
      data: allLoans.rows,
    });
  }

  /**
     * gets specific application
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns {json} json
     * @memberof LoanController
     */

  static async getOneLoan(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    const specificLoan = await loans.getOneLoan(id);
    if (specificLoan.rows.length === 0) {
      return res.status(404).send({
        error: 'No Loan with that id exist',
      });
    }
    return res.status(200).send({
      data: specificLoan.rows[0],
    });
  }

  /**
      * approves users loan
      * @param {object} request express request object
      * @param {object} response express response object
      *
      * @returns {json} json
      * @memberof LoanController
      */
  static async approveLoan(req, res) {
    let { id } = req.params;
    id = parseInt(id, 10);
    const { status } = req.body;
    const userLoan = await loans.getOneLoan(id);

    if (userLoan.rows.length === 0) {
      return res.status(404).send({
        error: 'Loan with that id not found',
      });
    }
    if (userLoan.rows[0].status === 'approved') {
      return res.status(409).send({
        error: 'Loan already approved',
      });
    }
    const updatedLoan = await loans.approveLoan(status, id);
    const {
      amount, tenor, paymentInstallment, interest,
    } = updatedLoan.rows[0];

    const updatedData = {
      loanId: updatedLoan.rows[0].id,
      amount,
      tenor,
      status: updatedLoan.rows[0].status,
      paymentInstallment,
      interest,
    };

    // const emailData = MessageHandler.loanApprovalMessage(userLoan, userLoan.user);
    // EmailHandler.sendNotif(emailData);

    return res.status(200).send({
      data: updatedData,
    });
  }
}

export default LoanController;
