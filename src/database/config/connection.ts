import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db: string = process.env.NODE_ENV === 'production' ? process.env.DB_URL! : process.env.DB_URL!

const options: PoolConfig = {
  connectionString: db,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection: Pool = new Pool(options);

export default connection;
