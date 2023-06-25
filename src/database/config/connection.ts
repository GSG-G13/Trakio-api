import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db: string = process.env.NODE_ENV === 'production' ? process.env.DB_URL! : process.env.DEV_DB_URL!

const options: PoolConfig = {
  connectionString: db,
  ssl: process.env.NODE_ENV === 'production',
};

const connection: Pool = new Pool(options);

export default connection;
