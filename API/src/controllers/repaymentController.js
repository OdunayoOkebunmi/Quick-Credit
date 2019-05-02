import Validate from '../middlewares/validation';
import loanModel from '../models/loansData';
import repaymentModel from '../models/repaymentsData';

class RepaymentController {
  /**
  *
  * @param {object} req
  * @param {object} res
  * @returns {object} rpayment object
   * @memberof RepaymentController
  */
  static postRepayment(req, res) {
    const { error } = Validate.validateRepayment(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }

    const id = parseInt(req.params.id, 10);
    const userLoan = loanModel.find(loan => loan.id === id);
    if (!userLoan) {
      return res.status(404).send({
        status: 404,
        error: 'Loan with the id not found!',
      });
    }

    const paidAmount = parseFloat(req.body.paidAmount);
    const balance = parseFloat(userLoan.balance) - paidAmount;

    const updatedData = {
      id,
      loanId: id,
      createdOn: userLoan.createdOn,
      amount: userLoan.amount,
      monthlyInstallemnt: userLoan.paymentInstallment,
      paidAmount,
      balance,
    };
    userLoan.balance = balance;
    if (balance === 0) userLoan.repaid = true;

    repaymentModel.push(updatedData);
    // console.log(paidAmount, userLoan.balance);
    if (userLoan.balance < 0) {
      return res.status(400).send({
        status: 400,
        error: 'The paid amount exceeds remaining balance!',
      });
    }
    if (userLoan.repaid) {
      return res.status(409).json({
        status: 409,
        error: 'Loan with the id has been fully repaid',
      });
    }
    return res.status(200).send({
      status: 200,
      data: updatedData,
    });
  }

  /**
  * @method getRepaymentHistory
  * @description user can view loan repayment history
  * @param {object} req
  * @param {object} res
  * @returns {object}
  */
  static getRepaymentHistory(req, res) {
    const { id } = req.params;
    const specificRepayment = repaymentModel.find(repayment => repayment.id === parseInt(id, 10));

    if (!specificRepayment.loanId) {
      return res.status(404).send({
        status: 404,
        error: 'Loan with the id not found!',
      });
    }
    return res.status(200).send({
      status: 200,
      data: specificRepayment,
    });
  }
}

export default RepaymentController;
