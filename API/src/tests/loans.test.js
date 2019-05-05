import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.should();
chai.use(chaiHttp);

// TEST FOR USER LOAN APPLICATION
const loginUrl = '/api/v1/auth/signin';
const loanUrl = '/api/v1/loans';
let currentToken;

describe('Test user loan application', () => {
  describe('POST /loans', () => {
    const user = {
      email: 'odun@mail.com',
      password: 'password',
    };
    before((done) => {
      chai
        .request(app)
        .post(`${loginUrl}`)
        .send(user)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should successfully create user loan', (done) => {
      const userLoan = {
        firstName: 'Odun',
        lastName: 'Odunayo',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(201);
          res.body.should.have.property('data');
          done();
        });
    });
    it('should throw an error if user is not authenticated', (done) => {
      const userLoan = {
        firstName: 'Odun',
        lastName: 'Odunayo',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw an error if email is ommitted', (done) => {
      const userLoan = {
        firstName: 'Odun',
        lastName: 'Odunayo',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if firstName is ommitted', (done) => {
      const userLoan = {
        email: 'odun@mail.com',
        lastName: 'Odunayo',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if firstName is less than 3 characters', (done) => {
      const userLoan = {
        firstName: 'Od',
        lastName: 'Odunayo',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if firstName is not a string', (done) => {
      const userLoan = {
        firstName: 123,
        lastName: 'Odunayo',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if lastName is ommitted', (done) => {
      const userLoan = {
        email: 'odun@mail.com',
        firstName: 'Odunayo',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if lastName is less than 3 characters', (done) => {
      const userLoan = {
        lastName: 'Od',
        firstName: 'Odun',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if lastName is not a string', (done) => {
      const userLoan = {
        lastName: 123,
        firstName: 'Odun',
        email: 'odun@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if amount is ommitted', (done) => {
      const userLoan = {
        email: 'odun@mail.com',
        firstName: 'Odunayo',
        lastName: 'okeb',
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if amount is not a number', (done) => {
      const userLoan = {
        email: 'odun@mail.com',
        firstName: 'Odunayo',
        lastName: 'okeb',
        amount: 'two hundred',
        tenor: 4,
      };
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  describe('POST /loans', () => {
    const user = {
      email: 'harry@mail.com',
      password: 'dementor',
    };
    before((done) => {
      chai.request(app)
        .post(`${loginUrl}`)
        .send(user)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    const userLoan = {
      firstName: 'Harry',
      lastName: 'Potter',
      email: 'harry@mail.com',
      amount: 10000,
      tenor: 4,
    };
    before((done) => {
      chai.request(app)
        .post(`${loanUrl}`)
        .send(userLoan)
        .set('token', currentToken)
        .end(() => done());
    });
    it('should throw an error if user applies for loan more than once', (done) => {
      chai.request(app)
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  // TEST TO GET ALL LOAN APPLICATION
  describe(`GET ${loanUrl}`, () => {
    const adminLogin = {
      email: 'hedwig@quickcredit.com',
      password: 'passsword',
    };
    before((done) => {
      chai.request(app)
        .post(`${loginUrl}`)
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should return all loan applications', (done) => {
      chai
        .request(app)
        .get(loanUrl)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('user');
          res.body.data[0].should.have.property('id');
          done();
        });
    });

    it('Should throw an error if user is not an admin', (done) => {
      const login = {
        email: 'odun@mail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(app)
            .get(loanUrl)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Only Admin can access this route');
              done();
            });
        });
    });

    it('should return a single loan application', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(app)
            .get(`${loanUrl}/1`)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.have.property('user');
              res.body.data.should.have.property('createdOn');
              done();
            });
        });
    });

    it('Should throw an error if loan id does not exist', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(app)
            .get(`${loanUrl}/10`)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });

  // TEST TO VALIDATE LOANS QUERIES

  describe(`GET ${loanUrl}`, () => {
    const adminLogin = {
      email: 'hedwig@quickcredit.com',
      password: 'passsword',
    };
    before((done) => {
      chai.request(app)
        .post(`${loginUrl}`)
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should return all loans that have been approved and repaid', (done) => {
      chai
        .request(app)
        .get(`${loanUrl}?status=approved&repaid=true`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('user');
          res.body.data[0].should.have.property('id');
          done();
        });
    });
    it('should return all loans that have been approved but not repaid', (done) => {
      chai
        .request(app)
        .get(`${loanUrl}?status=approved&repaid=false`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('user');
          res.body.data[0].should.have.property('id');
          done();
        });
    });
    it('should throw an error if status="approved" query is incorrect', (done) => {
      chai
        .request(app)
        .get(`${loanUrl}?status=approvved&repaid=false`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should throw an error if repaid=true or repaid=false query is incorrect', (done) => {
      chai
        .request(app)
        .get(`${loanUrl}?status=approved&repaid=repaid`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('"repaid" must be a boolean');
          done();
        });
    });
  });

  // TEST ADMIN APPROVE OR REJECT LOAN
  describe(`PATCH ${loanUrl}/:id`, () => {
    const adminLogin = {
      email: 'hedwig@quickcredit.com',
      password: 'passsword',
    };
    const loanId = 1;
    before((done) => {
      chai.request(app)
        .post(`${loginUrl}`)
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should approve user loan', (done) => {
      const adminDecision = { status: 'approved' };
      chai
        .request(app)
        .patch(`${loanUrl}/${loanId}`)
        .set('authorization', currentToken)
        .send(adminDecision)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should throw an error if user has already been approved', (done) => {
      const adminDecision = { status: 'rejected' };
      chai
        .request(app)
        .patch(`${loanUrl}/${loanId}`)
        .set('authorization', currentToken)
        .send(adminDecision)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return error if a status is ommitted', (done) => {
      const adminDecision = { status: 3 };
      chai
        .request(app)
        .patch(`${loanUrl}/${loanId}`)
        .set('authorization', currentToken)
        .send(adminDecision)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
