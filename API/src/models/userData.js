import faker from 'faker';
import Authenticator from '../middlewares/authenticate';

const Users = [
  {
    id: 1,
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: Authenticator.hashPassword(faker.internet.password()),
    address: faker.address.streetAddress(),
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 2,
    email: 'hedwig@quickcredit.com',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: Authenticator.hashPassword('passsword'),
    address: faker.address.streetAddress(),
    status: 'verified',
    isAdmin: true,
  },
  {
    id: 3,
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: Authenticator.hashPassword(faker.internet.password()),
    address: faker.address.streetAddress(),
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 4,
    email: 'myname@mail.com',
    firstName: 'First',
    lastName: 'Last',
    password: Authenticator.hashPassword('password'),
    address: 'address',
    status: 'verified',
    isAdmin: false,
  },
];

export default Users;
