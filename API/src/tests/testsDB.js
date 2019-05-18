const users = [
  {
    // sign up test data
    email: 'patrickdoe@mail.com',
    firstName: 'Patrick',
    lastName: 'Doe',
    password: 'password',
    address: 'here',
  },
  {
    // email ommitted
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'password',
    address: 'here',
  },
  {
    // firstName ommited
    email: 'janedoe@mail.com',
    lastName: 'Doe',
    password: 'password',
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
    password: 'password',
  },
  {
    // firstName is not a string
    email: 'janedoe@mail.com',
    firstName: 123,
    lastName: 'Doe',
    password: 'password',
    address: 'here',
  },
  {
    // lastName is not a string
    email: 'janedoe@mail.com',
    firstName: 'Jane',
    lastName: 123,
    password: 'password',
    address: 'here',
  },

  // sign in test data 7
  {
    email: 'janedoe@mail.com',
    password: 'password',
  },
  // admin signin
  {
    email: 'johndoe@quickcredit.com', // valid login details
    password: 'password',
  },
  {
    email: 'name@mail.com',
    password: 'password',
  },
  {
    email: 'janedoe@mail.com',
    password: 'passsword', // incorrect password
  },

  {
    // email is not entered
    password: 'password',
  },
  {
    email: 'odun@mail.com',
    password: 'password',
  },
];

const loanApplication = [
  {
    email: 'odun@mail.com',
    amount: 10000,
    tenor: 4,
  },
  {
    // invalid amount
    email: 'odun@mail.com',
    amount: 'two hundered',
    tenor: 4,
  },
  {
    // unathorized user

    email: 'patrickdoe@mail.com',
    amount: 10000,
    tenor: 4,
  },
  {
    amount: 60000,
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
    paidAmount: 3000.00, // valid amount for post repayment
  },
  {
    paidAmount: 'two thousand', // valid amount for post repayment
  },
  {
    paidAmount: 200000.00, // valid amount for post repayment
  },
];

export default {
  users, loanApplication, adminDecision, repaymentAmount,
};
