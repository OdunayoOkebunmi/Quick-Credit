import query from './index';

const createTables = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(15) NOT NULL CHECK(status IN ('verified', 'unverified')) DEFAULT 'unverified',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id, email)
  );

  CREATE TABLE IF NOT EXISTS loans(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(10) NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    repaid BOOLEAN NOT NULL DEFAULT false,
    tenor NUMERIC NOT NULL CHECK(0 < tenor AND tenor <= 12),
    amount NUMERIC NOT NULL CHECK(10000 <= amount AND amount <= 200000),
    paymentInstallment NUMERIC NOT NULL,
    balance NUMERIC NOT NULL,
    interest NUMERIC NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS repayments(
    id SERIAL NOT NULL PRIMARY KEY,
    loanid INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK(amount > 0),
    createdon DATE NOT NULL DEFAULT CURRENT_DATE
  );
`;
query(createTables);
