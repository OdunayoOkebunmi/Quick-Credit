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
    const { id } = req.params;
    const paidAmount = parseFloat(req.body.paidAmount, 10);
    const userLoan = loanModel.find(loan => loan.id === parseInt(id, 10));
    if (userLoan) {
      const updatedData = {
        id,
        loanId: userLoan.id,
        createdOn: userLoan.createdOn,
        amount: userLoan.amount,
        monthlyInstallemnt: userLoan.paymentInstallment,
        paidAmount,
        balance: parseFloat(userLoan.balance, 10) - paidAmount,
      };
      // console.log(userLoan);
      repaymentModel.push(updatedData);
      return res.status(201).send({
        status: 201,
        data: updatedData,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id found!',
    });
  }
}

export default RepaymentController;
