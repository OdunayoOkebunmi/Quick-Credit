/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Repayments',
    [
      {
        id: '90356e2a-2f35-48e9-9add-9811c23f2122',
        loanId: '7b76954f-80df-413f-809f-66b5968d03fb',
        amount: 5000,

      },

    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Repayments', null, {}),
};
