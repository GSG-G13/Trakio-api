import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const { DB_URL } = process.env;

const db: string = process.env.NODE_ENV === 'production' ? process.env.DB_URL! : process.env.DEV_DB_URL!
console.log(db);

const options: PoolConfig = {
  connectionString: db,
  ssl: process.env.NODE_ENV === 'production',
};

const connection: Pool = new Pool(options);

export default connection;
