/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Loans',
    [
      {
        id: '7b76954f-80df-413f-809f-66b5968d03fb',
        userId: 'fdfe8617-208d-4b87-a000-5d6840786ab8',
        amount: 70000,
        tenor: 5,
        paymentInstallment: 14700,
        status: 'approved',
        repaid: false,
        balance: 73500,
        interest: 3500,

      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Loans', null, {}),
};
