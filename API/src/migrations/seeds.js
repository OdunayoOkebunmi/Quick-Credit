// import moment from 'moment';
import Authenticator from '../middlewares/authenticate';
import query from './index';

const insertIntoTables = `
INSERT INTO users ("firstName", "lastName", email, password, address, status, "isAdmin")
  VALUES ('Odun', 'Ayo', 'odun@mail.com', '${Authenticator.hashPassword('password')}', 'hogwarts','verified' ,false),
         ('Jane', 'Doe', 'janedoe@mail.com', '${Authenticator.hashPassword('password')}', 'hogwarts','unverified', false),
         ('John', 'Doe', 'johndoe@quickcredit.com', '${Authenticator.hashPassword('password')}', 'hogwarts','verified', true);

`;
query(insertIntoTables);
