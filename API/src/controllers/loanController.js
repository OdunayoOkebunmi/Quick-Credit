/* eslint-disable no-unused-vars */
import moment from 'moment';
import userModel from '../models/userData';
import loanModel from '../models/loansData';

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
  static loanApply(req, res) {
    const {
      email, amount, tenor,
    } = req.body;
    const details = req.body;

    // check if user is verifed
    const userData = userModel.find(user => user.email === email);
    if (!userData) {
      return res.status(401).json({
        status: 401,
        error: 'Email do not match! Enter the email you registered with',
      });
    }
    if (userData.status !== 'verified') {
      return res.status(401).json({
        status: 401,
        error: 'User not verified. You cannot apply for a loan yet',
      });
    }

    if (loanModel.find(loan => loan.user === email)) {
      return res.status(409).json({
        status: 409,
        error: 'Already applied for a loan',
      });
    }
    const loanId = loanModel.length + 1;
    const status = 'pending';
    const interest = 0.05 * parseFloat(amount).toFixed(2);
    const paymentInstallment = parseFloat((amount + interest) / tenor).toFixed(2);
    const balance = parseFloat(paymentInstallment * tenor).toFixed(2);
    const createdOn = moment().format('llll');
    const repaid = false;
    const data = {
      loanId,
      ...details,
      paymentInstallment,
      status,
      balance,
      interest,
    };
    // updated user data
    const updatedData = {
      id: data.loanId,
      user: data.email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };

    loanModel.push(updatedData);
    return res.status(201).json({
      status: 201,
      data,
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
  static getAllLoans(req, res) {
    const { status, repaid } = req.query;
    if (status && repaid) {
      const currentLoan = loanModel
        .filter(loan => loan.status === status && loan.repaid === JSON.parse(repaid));
      return res.status(200).send({
        status: 200,
        data: currentLoan,
      });
    }
    return res.status(200).send({
      status: 200,
      data: loanModel,
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

  static getOneLoan(req, res) {
    const { id } = req.params;
    const specificLoan = loanModel.find(loan => loan.id === parseInt(id, 10));
    // console.log(id);
    if (specificLoan) {
      return res.status(200).send({
        status: 200,
        data: specificLoan,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id exist',
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
  static approveLoan(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const userLoan = loanModel.find(loan => loan.id === parseInt(id, 10));
    if (!userLoan) {
      return res.status(404).send({
        status: 404,
        error: 'Loan with that id not found',
      });
    }
    if (userLoan.status === 'approved') {
      return res.status(409).send({
        status: 409,
        error: 'Loan already approved',
      });
    }
    userLoan.status = status;
    const {
      tenor, monthlyInstallments, interest,
    } = userLoan;

    const updatedData = {
      loanId: userLoan.id,
      loanAmount: userLoan.amount,
      tenor,
      status: userLoan.status,
      monthlyInstallments,
      interest,
    };

    // const emailData = MessageHandler.loanApprovalMessage(userLoan, userLoan.user);
    // EmailHandler.sendNotif(emailData);

    return res.status(200).send({
      status: 200,
      data: updatedData,
    });
  }
}

export default LoanController;
