import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.should();
chai.use(chaiHttp);

const loginUrl = '/api/v1/auth/signin';
const repaymentUrl = '/api/v1/loans/1/repayment';
const userRepaymentUrl = '/api/v1/loans/1/repayments';
let currentToken;

describe('Test loan repayment', () => {
  describe('ADMIN CAN POST LOAN REPAYMENT RECORD IN FAVOUR OF A CLIENT', () => {
    describe(`POST ${repaymentUrl}`, () => {
      const adminLogin = {
        email: 'hedwig@quickcredit.com',
        password: 'passsword',
      };

      const amount = { paidAmount: 5000 };
      before((done) => {
        chai.request(app)
          .post(`${loginUrl}`)
          .send(adminLogin)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should post loan repayment record for a client', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('paidAmount');
            res.body.data.should.have.property('createdOn');
            done();
          });
      });
      it('should throw an error if token was not provided', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
      it('should throw an error if amount was not provided', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if amount is not a number', (done) => {
        const wrongAmount = 'two thousand';
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(wrongAmount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
    // check if id exists
    describe(`POST ${repaymentUrl}`, () => {
      const adminLogin = {
        email: 'hedwig@quickcredit.com',
        password: 'passsword',
      };

      const amount = { paidAmount: 5000 };
      before((done) => {
        chai.request(app)
          .post(`${loginUrl}`)
          .send(adminLogin)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should throw an error if id is not found', (done) => {
        const wrongUrl = '/api/v1/loans/209/repayment';
        chai
          .request(app)
          .post(wrongUrl)
          .set('authorization', currentToken)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if id is not an integer', (done) => {
        const wrongUrl = '/api/v1/loans/w/repayment';
        chai
          .request(app)
          .post(wrongUrl)
          .set('authorization', currentToken)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if paidAmount is not found', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if paid amount is not an integer', (done) => {
        const wrongAmount = 'two thousand';
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(wrongAmount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if token is not entered', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
    });
    // authenticate access to the route
    describe(`POST ${repaymentUrl}`, () => {
      const userLogin = {
        email: 'odun@mail.com',
        password: 'password',
      };

      const amount = { paidAmount: 5000 };
      before((done) => {
        chai.request(app)
          .post(`${loginUrl}`)
          .send(userLogin)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should throw not post repayment is user is not authenticated', (done) => {
        chai
          .request(app)
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Only Admin can access this route');
            done();
          });
      });
    });
  });


  // TEST TO GET THE REPAYMENT RECORD FROM USERS
  describe('USER CAN VIEW LOAN REPAYMENT HISTORY', () => {
    describe(`GET ${userRepaymentUrl}`, () => {
      const userLogin = {
        email: 'odun@mail.com',
        password: 'password',
      };
      before((done) => {
        chai.request(app)
          .post(`${loginUrl}`)
          .send(userLogin)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should get loan repayment record of client', (done) => {
        chai
          .request(app)
          .get(userRepaymentUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('specificRepayment');
            done();
          });
      });
      it('should throw an error if id is not found', (done) => {
        const wrongUrl = '/api/v1/loans/209/repayments';
        chai
          .request(app)
          .get(wrongUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if id is not found', (done) => {
        const wrongUrl = '/api/v1/loans/w/repayments';
        chai
          .request(app)
          .get(wrongUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if there is no token', (done) => {
        chai
          .request(app)
          .get(userRepaymentUrl)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
    });

    // check if admin is accessing the route
    describe(`GET ${userRepaymentUrl}`, () => {
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
      it('should throw not get repayment record if user is not authenticated', (done) => {
        chai
          .request(app)
          .get(userRepaymentUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Only Authenticated User can access this route');
            done();
          });
      });
    });
  });
});
