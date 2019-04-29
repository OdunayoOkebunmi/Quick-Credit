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
}

export default LoanController;
