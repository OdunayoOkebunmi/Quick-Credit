import debug from 'debug';
import pool from './db';


const log = debug('dev');

const query = async (queryString) => {
  pool.on('connect', () => {
    log('connected to the db');
  });
  pool.query(queryString)
    .then((res) => {
      log(res);
      pool.end();
    })
    .catch((err) => {
      log(err);
      pool.end();
    });

  pool.on('remove', () => {
    log('client removed');
    process.exit(0);
  });
};
export default query;
