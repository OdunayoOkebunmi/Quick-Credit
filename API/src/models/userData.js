import Authenticator from '../middlewares/authenticate';

const Users = [
  {
    id: 1,
    email: 'odun@mail.com',
    firstName: 'odun',
    lastName: 'okebunmi',
    password: Authenticator.hashPassword('password'),
    address: 'hogwarts school of wizadry',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: 2,
    email: 'hedwig@quickcredit.com',
    firstName: 'Harry',
    lastName: 'Potter',
    password: Authenticator.hashPassword('passsword'),
    address: 'hogwarts school of wizadry',
    status: 'verified',
    isAdmin: true,
  },
  {
    id: 3,
    email: 'harry@mail.com',
    firstName: 'Harry',
    lastName: 'Potter',
    password: Authenticator.hashPassword('dementor'),
    address: 'hogwarts school of wizadry',
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 4,
    email: 'voldemort@mail.com',
    firstName: 'Tom',
    lastName: 'Riddle',
    password: Authenticator.hashPassword('tomriddle'),
    address: 'hogwarts school of wizadry',
    status: 'verified',
    isAdmin: false,
  },
];

export default Users;
