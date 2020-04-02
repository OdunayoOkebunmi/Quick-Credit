const users = [
  {
    // sign up test data
    email: 'jerrydoe@mail.com',
    firstName: 'Jerry',
    lastName: 'Doe',
    password: 'pasSword2',
    address: 'here',
  },
  {
    // email ommitted
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'pasSword2',
    address: 'here',
  },
  {
    // firstName ommited
    email: 'janedoe@mail.com',
    lastName: 'Doe',
    password: 'pasSword2',
    address: 'here',
  },
  {
    // password ommtted
    email: 'janedoe@mail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    address: 'here',
  },
  {
    // address ommtted
    email: 'janedoe@mail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'pasSword2',
  },
  {
    // firstName is not a string
    email: 'janedoe@mail.com',
    firstName: 123,
    lastName: 'Doe',
    password: 'pasSword2',
    address: 'here',
  },
  {
    // lastName is not a string
    email: 'janedoe@mail.com',
    firstName: 'Jane',
    lastName: 123,
    password: 'pasSword2',
    address: 'here',
  },

  // sign in test data 7
  {
    email: 'janedoe@mail.com',
    password: 'pasSword2',
  },
  // admin signin
  {
    email: 'johndoe@quickcredit.com', // valid login details
    password: 'pasSword2',
  },
  {
    email: 'name@mail.com',
    password: 'pasSword2',
  },
  {
    email: 'janedoe@mail.com',
    password: 'passsword', // incorrect password
  },

  {
    // email is not entered
    password: 'pasSword2',
  },
  {
    email: 'odun@mail.com',
    password: 'pasSword2',
  },
  {
    email: 'patrickdoe@mail.com',
    password: 'pasSword2',
  },
];

const loanApplication = [
  {
    email: 'patrickdoe@mail.com',
    firstName: 'Patrick',
    lastName: 'Doe',
    amount: 10000,
    tenor: 4,
  },
  {
    // invalid amount
    email: 'janedoe@mail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    amount: 'two hundered',
    tenor: 4,
  },
  {
    // unathorized user

    email: 'patrickdoe@mail.com',
    firstName: 'Patrick',
    lastName: 'Doe',
    amount: 10000,
    tenor: 4,
  },
  {
    amount: 60000,
    firstName: 'Jane',
    lastName: 'Doe',
    tenor: 4, //  no email
  },
];

const adminDecision = [
  {
    status: 'approved', // approve the loan application
  },
  {
    status: 'pending', // reject the loan application
  },
  {
    status: 'iAmInvalid', // incorrect query citerea
  },
  {
    status: 'rejected', // reject the loan application
  },
];

const repaymentAmount = [
  {
    amount: 3000.00, // valid amount for post repayment
  },
  {
    amount: 'two thousand', // valid amount for post repayment
  },
  {
    amount: 200000.00, // valid amount for post repayment
  },
];

export default {
  users, loanApplication, adminDecision, repaymentAmount,
};
