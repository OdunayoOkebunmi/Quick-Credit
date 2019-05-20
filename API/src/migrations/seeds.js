import Authenticator from '../middlewares/authenticate';
import query from './index';

const insertIntoTables = `
  INSERT INTO users ("firstName", "lastName", email, password, address, status, "isAdmin")
  VALUES ('Odun', 'Ayo', 'odun@mail.com', '${Authenticator.hashPassword('password')}', 'hogwarts','verified' ,false),
         ('Jane', 'Doe', 'janedoe@mail.com', '${Authenticator.hashPassword('password')}', 'hogwarts','unverified', false),
         ('Patrick', 'Doe', 'patrickdoe@mail.com', '${Authenticator.hashPassword('password')}', 'hogwarts','verified', false),
         ('John', 'Doe', 'johndoe@quickcredit.com', '${Authenticator.hashPassword('password')}', 'hogwarts','verified', true);

 
  INSERT INTO loans (email,"firstName","lastName", amount, tenor,"paymentInstallment", status, repaid, balance, interest)
  VALUES ('odun@mail.com','odun','ayo',70000, 5, 14700, 'approved', false, 40000, 3500),
         ('janedoe@mail.com','jane','doe',70000, 5, 14700, 'pending', false, 73500, 3500);

 INSERT INTO repayments ("loanId",amount)
  VALUES (1,4000.00),
         (2,4000.00);
`;
query(insertIntoTables);
