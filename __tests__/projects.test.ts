import request from "supertest";
import dotenv from 'dotenv';
import app from "../src/app";
import buildDatabase from "../src/database/config/build";
import connection from "../src/database/config";

dotenv.config();

beforeAll(() => {
  buildDatabase();
});

describe('Get Project Route', () => {
  test('Should display projects', (done) => {
    request(app)
      .get('/projects')
      .set('cookie', `token=${process.env.TOKEN}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Show Projects Successfully');
        done();
      });
  });
});

afterAll((done) => {
  connection.end();
  done();
})
