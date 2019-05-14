import loanModel from '../models/loansData';
import repaymentModel from '../models/repaymentsData';

class RepaymentController {
  /**
    * create new user
    * @param {object} request express request object
    * @param {object} response express response object
    *
    * @returns {json} json
    * @memberof RepaymentController
    */
  static postRepayment(req, res) {
    const id = parseInt(req.params.id, 10);
    const userLoan = loanModel.find(loan => loan.id === id);
    const paidAmount = parseFloat(req.body.paidAmount);
    if (userLoan) {
      if (userLoan.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan has not yet been approved!',
        });
      }
      if (userLoan.repaid === true) {
        return res.status(400).send({
          status: 400,
          error: 'This loan has been repaid',
        });
      }
      if (paidAmount > userLoan.balance) {
        return res.status(400).send({
          status: 400,
          error: `The paid amount exceeds remaining balance!You only have ₦ ${userLoan.balance} left`,
        });
      }
      if (paidAmount <= userLoan.balance) {
        userLoan.balance -= paidAmount;
        const { createdOn, amount, balance } = userLoan;
        const updatedData = {
          id,
          loanId: userLoan.id,
          createdOn,
          amount,
          monthlyInstallemnt: userLoan.paymentInstallment,
          paidAmount,
          balance,
        };
        if (userLoan.balance === 0) {

          repaymentModel.push(updatedData);
          userLoan.repaid = true;
          return res.status(201).send({
            status: 201,
            message: 'Loan has been fully repaid',
            data: updatedData,
          });
        }
        repaymentModel.push(updatedData);
        return res.status(201).send({
          status: 201,
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
   * create new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns [array] array
   * @memberof RepaymentController
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
