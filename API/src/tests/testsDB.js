import faker from 'faker';

const email = faker.internet.email();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const password = faker.internet.password();
const address = faker.address.streetAddress();
const users = [
  {
    // sign up test data
    email,
    firstName,
    lastName,
    password,
    address,
  },
  {
    // invalid email
    email: 123,
    firstName,
    lastName,
    password,
    address,
  },
  {
    // email ommitted
    firstName,
    lastName,
    password,
    address,
  },
  {
    // firstName ommited
    email,
    lastName,
    password,
    address,
  },
  {
    // password ommtted
    email,
    firstName,
    lastName,
    address,
  },
  {
    // address ommtted
    email,
    firstName,
    lastName,
    password,
  },
  {
    // firstName is not a string
    email,
    firstName: 122,
    lastName,
    password,
    address,
  },
  {
    // lastName is not a string
    email,
    firstName,
    lastName: 222,
    password,
    address,
  },

  // sign in test data 8
  {
    email,
    password,
  },
  // admin signin
  {
    email: 'hedwig@quickcredit.com', // valid login details
    password: 'passsword',
  },
  {
    email: 'aname@mail.com', // invalid login email
    password,
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
    password,
  },
  {
    email: 'myname@mail.com',
    password: 'password',
  },
  {
    email, // invalid login email
    password: 'passsword', // incorrect password
  },
  {
    email, // verify user
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

    email,
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
