
const users = [
  {
    // sign up test data
    email: 'name@mail.com',
    firstName: 'First',
    lastName: 'Last',
    password: 'password',
    address: 'address',
  },
  {
    // invalid email
    email: 123,
    firstName: 'First',
    lastName: 'Last',
    password: 'password',
    address: 'address',
  },
  {
    // email ommitted
    firstName: 'First',
    lastName: 'Last',
    password: 'password',
    address: 'address',
  },
  {
    // firstName ommited
    email: 'name@mail.com',
    lastName: 'Last',
    password: 'password',
    address: 'address',
  },
  {
    // password ommtted
    email: 'name@mail.com',
    firstName: 'First',
    lastName: 'Last',
    address: 'address',
  },
  {
    // address ommtted
    email: 'name@mail.com',
    firstName: 'First',
    lastName: 'Last',
    password: 'password',
  },
  {
    // firstName is not a string
    email: 'name@mail.com',
    firstName: 123,
    lastName: 'Last',
    password: 'password',
    address: 'address',
  },
  {
    // lastName is not a string
    email: 'name@mail.com',
    firstName: 'First',
    lastName: 234,
    password: 'password',
    address: 'address',
  },

  // sign in test data 8
  {
    email: 'name@mail.com',
    password: 'password',
  },
  // admin signin
  {
    email: 'hedwig@quickcredit.com', // valid login details
    password: 'passsword',
  },
  {
    email: 'aname@mail.com', // invalid login email
    password: 'password',
  },
  {
    // invalid login email
    email: 123, // invalid login email
    password: 'password',
  },
  {
    email: 'name@mail.com', // invalid login email
    password: 'passsword', // incorrect password
  },

  {
    // email is not entered
    password: 'password',
  },
  {
    email: 'myname@mail.com',
    password: 'password',
  },

];

const loanApplication = [
  {
    email: 'myname@mail.com',
    amount: 10000,
    tenor: 4,
  },
  {
    // invalid amount
    email: 'myname@mail.com',
    amount: 'two hundered',
    tenor: 4,
  },
  {
    // unathorized user

    email: 'aname@mail.com',
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
];

export default {
  users, loanApplication, adminDecision, repaymentAmount,
};
