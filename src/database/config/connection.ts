import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

const options: PoolConfig = {
  connectionString: DB_URL,
  ssl: false,
};

const connection: Pool = new Pool(options);

export default connection;
