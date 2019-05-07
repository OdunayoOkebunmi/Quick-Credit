import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.should();
chai.use(chaiHttp);

// TESTS FOR SIGNUP

describe('Test user signup', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user', (done) => {
      const newUser = {
        email: 'voldemort@email.com',
        firstName: 'Tom',
        lastName: 'Riddle',
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('password');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });
    it('should throw a 409 error if the email already exists', (done) => {
      const user = {
        email: 'odun@mail.com',
        firstName: 'Tom',
        lastName: 'Riddle',
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
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
    it('should throw a 400 error if the email is ommitted', (done) => {
      const user = {
        firstName: 'Tom',
        lastName: 'Riddle',
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw a 400 if the first name is ommitted', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        lastName: 'Riddle',
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw a 400 if the password is ommitted', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'Tom',
        lastName: 'Riddle',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw a 400 if the address is ommitted', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'Tom',
        lastName: 'Riddle',
        password: 'averderkarbra',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw a 400 if the firstName is not a string', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 123,
        lastName: 'Riddle',
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw a 400 if the lastName is not a string', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'Tom',
        lastName: 123,
        password: 'averdekardabra',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw an error if the firstName is less than 3 characters', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'To',
        lastName: 'Riddle',
        password: 'aver',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw an error if the lastName is less than 3 characters', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'Tom',
        lastName: 'Ri',
        password: 'aver',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should throw an error if the password is less than 7 characters', (done) => {
      const user = {
        email: 'voldemort@nadini.com',
        firstName: 'Tom',
        lastName: 'Riddle',
        password: 'aver',
        address: 'hollow',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});


// TESTS FOR SIGNUP

describe('Test user signin', () => {
  describe('POST /api/v1/auth/signin', () => {
    it('should sign registered user in', (done) => {
      const user = {
        email: 'odun@mail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return 400 status if email is incorrect ', (done) => {
      const user = {
        email: 'odunayo@mail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid email');
          done();
        });
    });
    it('should return 400 status if password is incorrect ', (done) => {
      const user = {
        email: 'odun@mail.com',
        password: 'mypassword',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid password/email');
          done();
        });
    });
    it('should return 400 status if email is not entered ', (done) => {
      const user = {
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
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
      const Admin = {
        email: 'hedwig@quickcredit.com',
        password: 'passsword',
      };

      const email = 'harry@mail.com';
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(Admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              done();
            });
        });
    });
    it('should  throw an error if not admin to mark user as verified', (done) => {
      const notAdmin = {
        email: 'odun@mail.com',
        password: 'password',
      };

      const email = 'odun@mail.com';
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(notAdmin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              done();
            });
        });
    });
    it('should  throw an error if user email is not correct', (done) => {
      const admin = {
        email: 'hedwig@quickcredit.com',
        password: 'passsword',
      };

      const email = 'odunayo@mail.com';
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('User with this email not found!');
              done();
            });
        });
    });
    it('should throw a 401 when no token is provided', (done) => {
      const Admin = {
        email: 'hedwig@quickcredit.com',
        password: 'passsword',
      };

      const email = 'odun@mail.com';
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(Admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line no-unused-vars
          const token = `Bearer ${loginRes.body.data.token}`;
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
