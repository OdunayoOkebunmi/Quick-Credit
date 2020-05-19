import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import { userData } from './mockData';

const {
  expect,
} = chai;
chai.use(chaiHttp);

const server = () => chai.request(app);

const API_PREFIX = '/api/v1';
let adminToken;

describe('Test user signup', () => {
  it('should create a new user', (done) => {
    server()
      .post(`${API_PREFIX}/auth/signup`)
      .send(userData[2])
      .end((err, res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body.user).to.have.property('token');
        expect(res.body.user).to.have.property('message');
        done();
      });
  });
  it('should validate user data', (done) => {
    server()
      .post(`${API_PREFIX}/auth/signup`)
      .send(userData[1])
      .end((err, res) => {
        expect(res.status).to.be.eql(400);
        expect(res.body).to.be.a('object');
        expect(res.body.errors).to.be.a('object');
        expect(res.body.errors).to.have.property('firstName');
        done();
      });
  });
});


describe('Test user signin', () => {
  it('should signin an existing user', (done) => {
    server()
      .post(`${API_PREFIX}/auth/signin`)
      .send(userData[1])
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.user).to.have.property('token');
        expect(res.body.user).to.have.property('message');
        done();
      });
  });
  it('should validate user data', (done) => {
    server()
      .post(`${API_PREFIX}/auth/signin`)
      .send(userData[3])
      .end((err, res) => {
        expect(res.status).to.be.eql(404);
        expect(res.body).to.be.a('object');
        expect(res.body.errors).to.be.a('object');
        expect(res.body.errors).to.have.property('message').eql('User with the email does not exist');
        done();
      });
  });
});

describe('Test Admin mark user as verified', () => {
  before((done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(userData[0])
      .end((err, res) => {
        const { token } = res.body.user;
        adminToken = token;
        done();
      });
  });
  it('should mark a user as verified', (done) => {
    server()
      .patch(`${API_PREFIX}/users/${userData[2].email}/verify`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.user).to.have.property('message').eql('User verified');
        expect(res.body.user.data).to.have.property('isVerified').eql(true);
        done();
      });
  });
});
