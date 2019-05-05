import Validate from '../middlewares/validation';
import loanModel from '../models/loansData';
import repaymentModel from '../models/repaymentsData';

class RepaymentController {
  /**
  * @method postRepayment
  * @description creates a loan repayment transaction for the user by the admin
  * @param {object} req
  * @param {object} res
  * @returns {object} repayment object
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
    const paidAmount = parseFloat(req.body.paidAmount);
    if (userLoan) {
      // check if the loan has been approved
      if (userLoan.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan has not yet been approved!',
        });
      }
      // check if the amount been paid is greater than the balance left
      if (paidAmount > userLoan.balance) {
        return res.status(400).send({
          status: 400,
          error: `The paid amount exceeds remaining balance!You only have ₦ ${userLoan.balance} left`,
        });
      }

      // check if the amount been paid is less than the balance
      if (paidAmount <= userLoan.balance) {
        userLoan.balance -= paidAmount;

        const updatedData = {
          id,
          loanId: userLoan.id,
          createdOn: userLoan.createdOn,
          amount: userLoan.amount,
          monthlyInstallemnt: userLoan.paymentInstallment,
          paidAmount,
          balance: userLoan.balance,
        };
        if (userLoan.balance === 0) {
          userLoan.repaid = true;
          return res.status(200).send({
            status: 200,
            message: 'Loan has been fully repaid',
            data: updatedData,
          });
        }
        repaymentModel.push(updatedData);
        return res.status(200).send({
          status: 200,
          data: updatedData,
        });
      }
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id found!',
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
    const specificRepayment = repaymentModel
      .filter(repayment => repayment.loanId === parseInt(id, 10));
    if (specificRepayment.length !== 0) {
      return res.status(200).send({
        status: 200,
        specificRepayment,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No repayment record found',
    });
  }
}

export default RepaymentController;
