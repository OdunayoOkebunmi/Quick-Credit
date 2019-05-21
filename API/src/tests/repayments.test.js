import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import testsDB from './testsDB';

chai.should();
chai.use(chaiHttp);

const server = () => chai.request(app);

const loginUrl = '/api/v1/auth/signin';
const repaymentUrl = '/api/v1/loans/1/repayment';
const userRepaymentUrl = '/api/v1/loans/1/repayments';
let currentToken;

describe('Test loan repayment', () => {
  describe('ADMIN CAN POST LOAN REPAYMENT RECORD IN FAVOUR OF A CLIENT', () => {
    describe(`POST ${repaymentUrl}`, () => {
      before((done) => {
        server()
          .post(`${loginUrl}`)
          .send(testsDB.users[8])
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should post loan repayment record for a client', (done) => {
        server()
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(testsDB.repaymentAmount[0])
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('paidAmount');
            res.body.data.should.have.property('createdOn');
            done();
          });
      });
      it('should return an error if token was not provided', (done) => {
        server()
          .post(repaymentUrl)
          .send(testsDB.repaymentAmount[0])
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
      it('should return an error if amount was not provided', (done) => {
        server()
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
        server()
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(testsDB.repaymentAmount[1])
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
      before((done) => {
        server()
          .post(`${loginUrl}`)
          .send(testsDB.users[8])
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });

      it('should throw an error if id is not an integer', (done) => {
        const wrongUrl = '/api/v1/loans/w/repayment';
        server()
          .post(wrongUrl)
          .set('authorization', currentToken)
          .send(testsDB.repaymentAmount[0])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if paidAmount is not entered', (done) => {
        server()
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if paidAmount is greater than balance', (done) => {
        server()
          .post(repaymentUrl)
          .set('authorization', currentToken)
          .send(testsDB.repaymentAmount[2])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });


  // TEST TO GET THE REPAYMENT RECORD FROM USERS
  describe('USER CAN VIEW LOAN REPAYMENT HISTORY', () => {
    describe(`GET ${userRepaymentUrl}`, () => {
      beforeEach((done) => {
        server()
          .post(`${loginUrl}`)
          .send(testsDB.users[7])
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should throw an error if id is not an integer', (done) => {
        const wrongUrl = '/api/v1/loans/w/repayments';
        server()
          .get(wrongUrl)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('should throw an error if token is not found', (done) => {
        server()
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
      before((done) => {
        server()
          .post(`${loginUrl}`)
          .send(testsDB.users[8])
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should return if user is not authenticated', (done) => {
        server()
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
