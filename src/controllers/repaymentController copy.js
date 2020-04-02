/* eslint-disable import/prefer-default-export */
import models from '../database/models';

import { errorResponse, successResponse } from '../helper/responseHandler';
import { repayLoanHelper } from '../helper/loanRepayment';

const { Loan, Repayment, User } = models;

export const postRepayment = async (req, res, next) => {
  try {
    const { params: { id }, body: { amount } } = req;
    const loan = await Loan.findOne({ where: { id } });

    if (!loan) {
      return errorResponse(res, 404, { message: 'Loan not found' });
    }
    const { balance } = loan;
    const { status } = loan;
    return await repayLoanHelper(res, id, amount, status, balance, loan);
  } catch (error) {
    return next(error);
  }
};

export const getRepaymentHistory = async (req, res, next) => {
  try {
    const { params: { id }, user: { email } } = req;

    const loan = await Loan.findOne({ where: { id } });
    if (!loan) {
      return errorResponse(res, 404, { message: 'Loan not found' });
    }
    const user = await User.findOne({ where: { email } });
    if (email !== user.email) {
      return errorResponse(res, 401, { message: 'Unathorized access' });
    }
    const repayment = await Repayment.findAndCountAll({ where: { loanId: id } });
    return successResponse(res, 200, 'repayment', repayment);
  } catch (error) {
    return next(error);
  }
};
