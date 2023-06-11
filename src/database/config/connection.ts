import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL, NODE_ENV } = process.env;

const options: PoolConfig = {
  connectionString: DB_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const connection: Pool = new Pool(options);

export default connection;
