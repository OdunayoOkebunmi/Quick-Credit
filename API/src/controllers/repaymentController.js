import loans from '../models/loansData';
import repayments from '../models/repaymentsData';

class RepaymentController {
  /**
    * create new user
    * @param {object} request express request object
    * @param {object} response express response object
    *
    * @returns {json} json
    * @memberof RepaymentController
    */
  static async postRepayment(req, res) {
    const id = parseInt(req.params.id, 10);
    const paidAmount = parseFloat(req.body.paidAmount);
    const userLoan = await loans.getOneLoan(id);
    // console.log(userLoan.rows[0]);
    if (userLoan.rows.length > 0) {
      if (userLoan.rows[0].status !== 'approved') {
        return res.status(401).send({
          error: 'This loan has not yet been approved!',
        });
      }
      if (userLoan.rows[0].repaid === true) {
        return res.status(400).send({
          error: 'This loan has been repaid',
        });
      }
      if (paidAmount > userLoan.rows[0].balance) {
        return res.status(400).send({
          error: `The paid amount exceeds remaining balance!You only have ₦ ${userLoan.rows[0].balance} left`,
        });
      }
      if (paidAmount <= userLoan.rows[0].balance) {
        userLoan.rows[0].balance -= paidAmount;

        if (userLoan.rows[0].balance === 0) {
          const postPayment = await repayments.postLoans(id, paidAmount);
          console.log(postPayment.rows[0]);
          return res.status(201).send({
            message: 'Loan has been fully repaid',
            // data: updatedData,
          });
        }
        // repayments.push(updatedData);
        const postPayment = await repayments.postLoans(id, paidAmount);
        console.log(userLoan.rows[0].balance);
        const updateLoanBalance = await loans.updateUserBalance(userLoan.rows[0].balance, id);

        console.log(postPayment.rows[0]);
        console.log(updateLoanBalance);
        return res.status(201).send({
          message: 'Loan has been fully repaid',
          // data: updatedData,
        });
      }
    }
    return res.status(404).send({

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
  // static getRepaymentHistory(req, res) {
  //   const { id } = req.params;
  //   const repaymentHistory = repayments
  //     .filter(repayment => repayment.loanId === parseInt(id, 10));
  //   if (repaymentHistory.length !== 0) {
  //     return res.status(200).send({

  //       data: repaymentHistory,
  //     });
  //   }
  //   return res.status(404).send({

  //     error: 'No repayment record found',
  //   });
  // }
}

export default RepaymentController;
