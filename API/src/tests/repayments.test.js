import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.should();
chai.use(chaiHttp);

const loginUrl = '/api/v1/auth/signin';
const repaymentUrl = '/api/v1/loans/1/repayment';
let currentToken;

describe('Test loan repayment', () => {
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
    it('should post loan applications for a client', (done) => {
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
  });
});
