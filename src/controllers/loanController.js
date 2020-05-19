import models from '../database/models';
import { errorResponse, successResponse } from '../helper/responseHandler';

const { User, Loan } = models;

export const loanApply = async (req, res, next) => {
  try {
    const { body: { tenor }, user: { email, id } } = req;
    const amount = Number(req.body.amount.toFixed(3));
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return errorResponse(res, 404, { message: 'User with the email does not exist' });
    }
    if (!findUser.isVerified) {
      return errorResponse(res, 401, { message: 'User not verified. You cannot apply for a loan yet' });
    }

    const findUserLoan = await Loan.findOne({ where: { userId: id } });
    if (findUserLoan && findUserLoan.repaid !== true) {
      return errorResponse(res, 409, { message: 'Already applied for a loan' });
    }
    const data = await Loan.create({
      tenor, amount, userId: id,
    });
    return successResponse(res, 201, 'loan', { message: 'Successfully applied for a loan', data });
  } catch (error) {
    return next(error);
  }
};

export const getAllLoans = async (req, res, next) => {
  try {
    const { query: { status } } = req;
    let { query: { repaid } } = req;
    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const loans = await Loan.findAndCountAll({
        where: {
          status, repaid,
        },
      });
      return successResponse(res, 200, 'loans', loans);
    }
    const loans = await Loan.findAndCountAll();
    return successResponse(res, 200, 'loans', loans);
  } catch (error) {
    return next(error);
  }
};

export const getSingleLoan = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const loan = await Loan.findOne({
      where: { id },
    });
    if (!loan) {
      return errorResponse(res, 404, { message: 'Loan not found' });
    }
    return successResponse(res, 200, 'loan', loan);
  } catch (error) {
    return next(error);
  }
};

export const approveLoan = async (req, res, next) => {
  try {
    const { params: { id }, body: { status } } = req;
    const loan = await Loan.findOne({
      where: { id },
    });
    if (!loan) {
      return errorResponse(res, 404, { message: 'Loan not found' });
    }
    await loan.update({
      status,
    }, { where: { id } });
    return successResponse(res, 200, 'loan', {
      message: `Loan already ${loan.status}`, loan,
    });
  } catch (error) {
    return next(error);
  }
};
