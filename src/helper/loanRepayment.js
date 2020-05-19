/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { errorResponse, successResponse } from './responseHandler';
import models from '../database/models';

const { Repayment } = models;

export const repayLoanHelper = async (res, id, amount, status, balance, loan) => {
  if (status !== 'approved') {
    return errorResponse(res, 400, { message: 'Loan not approved' });
  }
  if (amount > balance) {
    return errorResponse(res, 400, { message: `The paid amount exceeds remaining balance! You only have ₦ ${balance} left` });
  }
  if (amount <= balance) {
    balance -= amount;
    await Repayment.create({ loanId: id, amount });
    await loan.update({
      balance,
    }, { where: { id } });
  }
  if (balance === 0) {
    await loan.update({
      repaid: true,
      balance,
    }, { where: { id } });
    return successResponse(res, 201, 'loan', loan);
  }
  return successResponse(res, 201, 'loan', loan);
};
