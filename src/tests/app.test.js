import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.should();

chai.use(chaiHttp);

const wrongUrl = '/api/v1/wrongurl';
const url = '/';
const server = () => chai.request(app);
// TEST FOR DEFAULT ENDPOINTS
describe('Tests for When Endpoint does not exist', () => {
  describe(`GET ${wrongUrl}`, () => {
    it('should throw an error when wrong endpoint is used', (done) => {
      server()
        .get(wrongUrl)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Page not found');
          done();
        });
    });
  });
  it('should get url successfully', (done) => {
    server()
      .get(url)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Welcome to QUICK CREDIT');
        done();
      });
  });
});
