import moment from 'moment';
import userModel from '../models/userData';
import loanModel from '../models/loansData';

class LoanController {
  /**
  *
  * @param {object} req
  * @param {object} res
  * @returns {object} loan object
   * @memberof LoanController
  */
  static loanApply(req, res) {
    const {
      email, firstName, lastName, amount, tenor,
    } = req.body;
    // check if user is verifed
    const verifiedUser = userModel.find(user => user.email === email);

    // console.log(verifiedUser.status);
    // allow only verified user apply for loan
    if (verifiedUser.status === 'verified') {
      // check if user has applied for loan before
      const loanExist = loanModel.find(loan => loan.user === email);
      if (loanExist) {
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
        firstName,
        lastName,
        email,
        tenor,
        amount,
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

      loanModel.push(data);
      return res.status(201).json({
        status: 201,
        data: updatedData,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'User not verified. You cannot apply for a loan yet',
    });
  }

  /**
   * @method getAllLoans
   * @description gets all loan applications
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @returns {array}
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
  * @method getSpecificLoan
  * @description gets a specific loan applications
  * @param {object} req
  * @param {object} res
  * @returns {object}
  */

  static getSpecificLoan(req, res) {
    const { id } = req.params;
    const specificLoan = loanModel.find(loan => loan.id === parseInt(id, 10));
    if (!specificLoan) {
      return res.status(404).json({
        status: 404,
        error: 'Requested loan not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: specificLoan,
    });
  }

  /**
  * @description approve or reject loans
  * @param {object} req
  * @param {object} res
  * @returns {object}
  */
  static loanApproval(req, res) {
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
    const updatedData = {
      loanId: userLoan.id,
      loanAmount: userLoan.amount,
      tenor: userLoan.tenor,
      status: userLoan.status,
      monthlyInstallments: userLoan.paymentInstallment,
      interest: userLoan.interest,
    };
    return res.status(200).send({
      status: 200,
      data: updatedData,
    });
  }
}

export default LoanController;
