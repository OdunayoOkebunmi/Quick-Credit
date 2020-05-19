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
let approvedLoanId;

describe('Repayment Loans', () => {
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
  before((done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/loans`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        const { loans } = res.body;
        approvedLoanId = loans.rows[0].id;
        done();
      });
  });
  it('should post loan repayment for client successfully', (done) => {
    server()
      .post(`${API_PREFIX}/loans/repayments/${approvedLoanId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 500 })
      .end((err, res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body.loan).to.have.property('id');
        done();
      });
  });
  it('should get all loan repayments successfully', (done) => {
    server()
      .get(`${API_PREFIX}/loans/repayments/${approvedLoanId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.repayment).to.be.to.a('object');
        done();
      });
  });
});
