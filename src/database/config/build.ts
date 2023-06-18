import { readFileSync } from 'fs';
import { join } from 'path';
import connection from './connection';

const buildDatabase = () => {
  const buildFile = readFileSync(join(__dirname, 'build.sql')).toString();
  const fakeDataFile = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return connection.query(buildFile + fakeDataFile)
    .catch((err) => { throw err })
}

export default buildDatabase;
