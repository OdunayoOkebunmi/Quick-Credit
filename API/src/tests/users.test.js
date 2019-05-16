import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import testDB from './testsDB';

chai.should();
chai.use(chaiHttp);

const server = () => chai.request(app);

const signupUrl = '/api/v1/auth/signup';

const signinUrl = '/api/v1/auth/signin';

let currentToken;

// TESTS FOR SIGNUP
describe('Test user signup', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });
    it('should return an error if the email is ommitted', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return an error if the first name is ommitted', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[3])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return an error if the password is ommitted', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[4])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return an error if the address is ommitted', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[5])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return an error if the firstName is not a string', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[6])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should return an error if the lastName is not a string', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[7])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  describe('POST /api/v1/auth/signup', () => {
    before((done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[0])
        .end(() => done());
    });
    it('should return an error if the email already exists', (done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[0])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql(
            'User already exist',
          );
          done();
        });
    });
  });
});

// TESTS FOR SIGNIN

describe('Test user signin', () => {
  describe('POST /api/v1/auth/signin', () => {
    before((done) => {
      server()
        .post(`${signupUrl}`)
        .send(testDB.users[0])
        .end(() => done());
    });
    it('should sign registered user in', (done) => {
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[8])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return an error if email does not exist', (done) => {
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[10])
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('User with the email does not exist');
          done();
        });
    });
    it('should return an error if password is incorrect ', (done) => {
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[15])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid password/email');
          done();
        });
    });
    it('should return an error if email is not entered ', (done) => {
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[11])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});

// TESTS FOR ADMIN TO MARK USER AS VERIFIED
describe('Test Admin mark user as verified', () => {
  describe('PATCH /api/v1/users/:email/verify', () => {
    it('should mark a user as verified', (done) => {
      const { email } = testDB.users[8];
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[9])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', currentToken)
            .end((err, res) => {
              // console.log(res);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              done();
            });
        });
    });
    it('should  throw an error if unauthorized', (done) => {
      const email = 'name@mail.com';
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[8])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              done();
            });
        });
    });
    it('should  throw an error if user email is not correct', (done) => {
      const { email } = testDB.users[11];
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[9])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });
    it('should throw an error if no token is provided', (done) => {
      const email = 'odun@mail.com';
      server()
        .post(`${signinUrl}`)
        .send(testDB.users[9])
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
});
