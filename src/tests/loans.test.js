import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { userData, loanData } from './mockData';

const {
  expect,
} = chai;
chai.use(chaiHttp);

const server = () => chai.request(app);

const API_PREFIX = '/api/v1';
let adminToken;
let userToken;
let loanId;

describe('Test user loan application', () => {
  before((done) => {
    server()
      .post(`${API_PREFIX}/auth/signin`)
      .send(userData[1])
      .end((err, res) => {
        const { token } = res.body.user;
        userToken = token;
        done();
      });
  });
  before((done) => {
    server()
      .post(`${API_PREFIX}/auth/signin`)
      .send(userData[0])
      .end((err, res) => {
        const { token } = res.body.user;
        adminToken = token;
        done();
      });
  });
  it('should create a loan successfully', (done) => {
    server()
      .post(`${API_PREFIX}/loans`)
      .send(loanData[0])
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body.loan).to.have.property('data');
        expect(res.body.loan.data).to.have.property('id');
        loanId = res.body.loan.data.id;
        done();
      });
  });
  it('should get all loans successfully', (done) => {
    server()
      .get(`${API_PREFIX}/loans`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.loans).to.have.property('rows');
        expect(res.body.loans.rows).to.be.an('array');
        done();
      });
  });
  it('should get all repaid and approved  loans successfully', (done) => {
    server()
      .get(`${API_PREFIX}/loans?status=approved&repaid=true`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.loans).to.have.property('rows');
        expect(res.body.loans.rows).to.be.an('array');
        done();
      });
  });
  it('should get single loan successfully', (done) => {
    server()
      .get(`${API_PREFIX}/loans/${loanId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.loan).to.have.property('id');
        done();
      });
  });
  it('should approve user loan', (done) => {
    server()
      .patch(`${API_PREFIX}/loans/${loanId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'approved' })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.loan).to.have.property('message');
        done();
      });
  });
});
