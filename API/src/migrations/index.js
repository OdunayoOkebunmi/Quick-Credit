/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import pool from './db';

const query = async (queryString) => {
  pool.on('connect', () => {
  });
  pool.query(queryString)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });

  pool.on('remove', () => {
    process.exit(0);
  });
};
export default query;
