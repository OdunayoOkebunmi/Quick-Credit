const errorMessageHandler = (errorMessage, res) => res.status(400).json({
  status: 400,
  error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
});

const errorResponseHandler = res => res.status(400).json({
  status: 400,
  error: 'Missing required parameters',
});

const signupDetailsHandler = (signupReq) => {
  const {
    firstName, lastName, email, password, address, status, isAdmin,
  } = signupReq.body;

  const userDetails = {
    firstName, lastName, email, password, address, status, isAdmin,
  };
  return userDetails;
};

const loginDetailsHandler = (loginReq) => {
  const { email, password } = loginReq.body;

  const userDetails = {
    email, password,
  };
  return userDetails;
};

const loanDetailsHandler = (loanReq) => {
  const {
    email, firstName, lastName, tenor, amount,
  } = loanReq.body;

  const userLoan = {
    email, firstName, lastName, tenor, amount,
  };
  return userLoan;
};


const repaymentDetailsHandler = (repaymentReq) => {
  const { paidAmount } = repaymentReq.body;
  const userAmount = { paidAmount };
  return userAmount;
};

const idHandler = (idReq) => {
  const id = parseInt(idReq.params.id, 10);
  const userID = { id };
  // console.log(id);
  return userID;
};

const verificationHandler = (verifyReq) => {
  const { email } = verifyReq.params;
  const userID = { email };
  return userID;
};

const loanQueryHandler = (queryReq) => {
  const { status, repaid } = queryReq.query;
  const userQuery = { status, repaid };
  return userQuery;
};

const loanApprovalHandler = (loanReq) => {
  const { status } = loanReq.body;
  const adminApproval = { status };
  return adminApproval;
};
module.exports = {
  errorMessageHandler,
  errorResponseHandler,
  signupDetailsHandler,
  loginDetailsHandler,
  loanDetailsHandler,
  repaymentDetailsHandler,
  idHandler,
  verificationHandler,
  loanQueryHandler,
  loanApprovalHandler,
};
