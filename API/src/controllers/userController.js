import { generateToken, comparePassword } from '../middlewares/authenticate';
import models from '../database/models';
import EmailHandler from '../helper/emailHandler';
import MessageHandler from '../helper/emailMessageHandler';
import { errorResponse, successResponse } from '../helper/responseHandler';

const { User } = models;

export const createUser = async (req, res, next) => {
  try {
    const {
      body: {
        email, password, firstName, lastName, address,
      },
    } = req;
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
      return errorResponse(res, 409, { message: 'User already exist' });
    }
    const registeredUser = await User.create({
      email, password, firstName, lastName, address,
    });
    const {
      id,
      email: newUserEmail,
      isAdmin,
    } = registeredUser;
    const token = generateToken(id, newUserEmail, isAdmin);
    const emailData = MessageHandler.signupMessage(registeredUser);
    EmailHandler.sendNotif(emailData);

    return successResponse(res, 201, 'user', { message: 'You have successfully created an account', token });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return errorResponse(res, 404, { message: 'User with the email does not exist' });
    }
    const verifiedPassword = comparePassword(findUser.password, password);

    if (!verifiedPassword) {
      return errorResponse(res, 400, { message: 'Invalid password/email' });
    }
    const {
      id, isAdmin,
    } = findUser;
    const token = generateToken({
      id,
      email,
      isAdmin,
    });

    return successResponse(res, 200, 'user', { message: 'You have successfully logged in', token });
  } catch (error) {
    return next(error);
  }
};

export const adminVerifyUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return errorResponse(res, 404, { message: 'User with the email does not exist' });
    }
    if (findUser.isVerified) {
      return errorResponse(res, 409, { message: 'User already verified' });
    }

    await User.update({
      isVerified: true,
    }, { where: { email } });

    const updatedData = await User.findOne({ where: { email } });
    const { isVerified } = updatedData;
    const data = {
      email,
      isVerified,
    };

    return successResponse(res, 200, 'user', { message: 'User already verified', data });
  } catch (error) {
    return next(error);
  }
};
