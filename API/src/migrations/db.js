import { Pool, types } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

types.setTypeParser(1700, value => parseFloat(value));

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test'
    ? process.env.TESTDB_URL : process.env.DATABASE_URL,
});


export default pool;
