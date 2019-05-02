import moment from 'moment';
import Validate from '../middlewares/validation';
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
    const { error } = Validate.validateLoan(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }
    const {
      email, firstName, lastName, amount, tenor,
    } = req.body;
    const loanId = loanModel.length + 1;
    const status = 'pending';
    const interest = 0.05;
    const paymentInstallment = parseFloat((amount * interest) / tenor).toFixed(2);
    const balance = parseFloat(amount).toFixed(2);
    const createdOn = moment().format('llll');
    const repaid = false;
    const data = {
      loanId,
      firstName,
      lastName,
      email,
      tenor,
      amount: amount.toFixed(2),
      paymentInstallment,
      status,
      balance,
      interest,
    };
    const updatedData = {
      id: data.loanId,
      user: data.email,
      createdOn,
      status,
      repaid,
      tenor,
      amount: amount.toFixed(2),
      paymentInstallment,
      balance,
      interest,
    };
    const loanExist = loanModel.find(loan => loan.email === email);
    if (loanExist) {
      return res.status(409).json({
        status: 409,
        error: 'Already applied for a loan',
      });
    }
    loanModel.push(updatedData);
    return res.status(201).json({
      status: 201,
      data,
    });
  }

  /**
   * @method getAllLoans
   * @description gets all loan applications
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  static getAllLoans(req, res) {
    // for the request parameters
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
    if (userLoan) {
      userLoan.status = status;
      const updatedData = {
        loanId: userLoan.id,
        loanAmount: userLoan.amount,
        tenor: userLoan.tenor,
        monthlyInstallments: userLoan.paymentInstallment,
        status: userLoan.status,
        interest: userLoan.interest,
      };
      return res.status(200).send({
        status: 200,
        data: updatedData,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Loan with that id not found',
    });
  }
}

export default LoanController;
