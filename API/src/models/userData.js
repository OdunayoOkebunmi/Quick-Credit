import Authenticator from '../middlewares/authenticate';

const Users = [
  {
    id: 1,
    email: 'odun@mail.com',
    firstName: 'odun',
    lastName: 'okebunmi',
    password: Authenticator.hashPassword('password'),
    address: 'hogwarts school of wizadry',
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 2,
    email: 'hedwig@mail.com',
    firstName: 'Harry',
    lastName: 'Potter',
    password: Authenticator.hashPassword('passsword'),
    address: 'hogwarts school of wizadry',
    status: 'verified',
    isAdmin: true,
  },
];

export default Users;
