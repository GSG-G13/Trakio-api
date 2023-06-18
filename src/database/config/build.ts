import { readFileSync } from 'fs';
import { join } from 'path';
import connection from './connection';

const buildDatabase = () => {
  const buildFile = readFileSync(join(__dirname, 'build.sql')).toString();
  const fakeDataFile = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  connection.query(buildFile + fakeDataFile)
    .catch((error) => { throw (error) })
}

export default buildDatabase;
