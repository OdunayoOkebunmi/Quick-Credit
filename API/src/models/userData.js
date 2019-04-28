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
];

export default Users;
