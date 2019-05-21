import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import testDB from './testsDB';

chai.should();
chai.use(chaiHttp);

const server = () => chai.request(app);

// TEST FOR USER LOAN APPLICATION
const loginUrl = '/api/v1/auth/signin';
const loanUrl = '/api/v1/loans';
let currentToken;

describe('Test user loan application', () => {
  describe('POST /loans', () => {
    before((done) => {
      server()
        .post(`${loginUrl}`)
        .send(testDB.users[13])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });

    it('should throw an error if user is not authenticated', (done) => {
      server()
        .post(`${loanUrl}`)
        .send(testDB.loanApplication[2])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should throw an error if the amount is invalid', (done) => {
      server()
        .post(`${loanUrl}`)
        .set('authorization', currentToken)
        .send(testDB.loanApplication[1])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  // TEST TO GET ALL LOAN APPLICATION
  describe(`GET ${loanUrl}`, () => {
    before((done) => {
      server()
        .post(`${loginUrl}`)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });


    it('Should throw an error if user is not authorized', (done) => {
      server()
        .post(loginUrl)
        .send(testDB.users[7])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          server()
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
      server()
        .post(loginUrl)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          server()
            .get(`${loanUrl}/1`)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.have.property('email');
              res.body.data.should.have.property('createdOn');
              done();
            });
        });
    });

    it('should return an error if loan id does not exist', (done) => {
      server()
        .post(loginUrl)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          server()
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
    before((done) => {
      server()
        .post(`${loginUrl}`)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    
    it('should throw an error if status="approved" query is incorrect', (done) => {
      server()
        .get(`${loanUrl}?status=approvved&repaid=false`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw an error if repaid=true or repaid=false query is incorrect', (done) => {
      server()
        .get(`${loanUrl}?status=approved&repaid=repaid`)
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  // TEST ADMIN APPROVE OR REJECT LOAN
  describe(`PATCH ${loanUrl}/:id`, () => {
    const loanId = 1;
    before((done) => {
      server()
        .post(`${loginUrl}`)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });
    it('should approve user loan', (done) => {
      server()
        .patch(`${loanUrl}/2`)
        .set('authorization', currentToken)
        .send(testDB.adminDecision[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should throw an error if user has already been approved', (done) => {
      server()
        .patch(`${loanUrl}/${loanId}`)
        .set('authorization', currentToken)
        .send(testDB.adminDecision[0])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should return error if a status is incorrect', (done) => {
      server()
        .patch(`${loanUrl}/${loanId}`)
        .set('authorization', currentToken)
        .send(testDB.adminDecision[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
