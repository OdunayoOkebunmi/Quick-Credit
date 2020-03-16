/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { hashPassword } from '../../middlewares/authenticate';

const password = hashPassword('passwordHash');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuidv4(),
        firstName: 'John',
        lastName: 'Done',
        email: 'johndoe@admin.com',
        isVerified: true,
        isAdmin: true,
        password: `${password}`,
        address: 'Hogwarts School of Wizardy',
      },
      {
        id: uuidv4(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isVerified: true,
        isAdmin: false,
        password: `${password}`,
        address: 'Hogwarts School of Wizardy',

      },
      {
        id: '588ae2cd-de3f-404a-87b3-8a6d50864833',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isVerified: false,
        isAdmin: false,
        password: `${password}`,
        address: 'Hogwarts School of Wizardy',

      },
      {
        id: 'fdfe8617-208d-4b87-a000-5d6840786ab8',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isVerified: false,
        isAdmin: false,
        password: `${password}`,
        address: 'Hogwarts School of Wizardy',

      },

    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
