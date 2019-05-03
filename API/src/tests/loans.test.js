import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.should();
chai.use(chaiHttp);

// TEST FOR USER LOAN APPLICATION

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
        .post('/api/v1/auth/signin')
        .send(user)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should successfully create user loan', (done) => {
      const userLoan = {
        firstName: 'Odun',
        lastName: 'Odunayo',
        email: 'oduna@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(app)
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
        .post('/api/v1/loans')
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
});
