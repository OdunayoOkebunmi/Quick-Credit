import Schemas from './schemas';

export const validateSignUp = (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password, address, status, isAdmin,
    } = req.body;

    const userDetails = {
      firstName, lastName, email, password, address, status, isAdmin,
    };
    const result = Schemas.createUser(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDetails = {
      email, password,
    };
    const result = Schemas.createLogin(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateLoan = (req, res, next) => {
  try {
    const {
      email, firstName, lastName, tenor, amount,
    } = req.body;

    const userLoan = {
      email, firstName, lastName, tenor, amount,
    };
    const result = Schemas.createLoan(userLoan);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateRepayment = (req, res, next) => {
  try {
    const { paidAmount } = req.body;

    const userAmount = { paidAmount };
    const result = Schemas.createRepayment(userAmount);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateLoanQuery = (req, res, next) => {
  try {
    const { status, repaid } = req.query;

    const userQuery = { status, repaid };
    const result = Schemas.loanQuery(userQuery);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateLoanApproval = (req, res, next) => {
  try {
    const { status } = req.body;

    const adminApproval = { status };
    const result = Schemas.loanApproval(adminApproval);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};

export const validateId = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const userID = { id };
    const result = Schemas.userId(userID);
    console.log(id)
    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};
export const validateVerification = (req, res, next) => {
  try {
    const { email } = req.params;

    const userID = { email };
    const result = Schemas.userEmail(userID);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: 'Missing required parameters',
    });
  }
};
