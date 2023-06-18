import supertest from 'supertest';
import dotenv from 'dotenv';
import {
  afterAll, beforeEach, describe, test, expect,
} from '@jest/globals';
import app from '../src/app';
import connection from '../src/database/config';
import buildDatabase from '../src/database/config/build';

dotenv.config();

beforeAll(() => {
  buildDatabase();
});

afterAll(() => {
  connection.end();
});

describe('Check route /tasks => get tasks ', () => {
  test('Should return 401 when user Unauthorized', (done) => {
    supertest(app)
      .get('/tasks')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Should return 200 when the user Authorized', (done) => {
    supertest(app)
      .get('/tasks')
      .set('cookie', `token=${process.env.TOKEN}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
  test('Should return 404 when Page not found', (done) => {
    supertest(app)
      .get('/tasks/sd')
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('Should return 200 when add task', (done) => {
    supertest(app)
      .post('/project/10/task')
      .set('cookie', `token=${process.env.TOKEN}`)
      .send({
        title: 'add query tasks',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Task added successfully');
        expect(res.body.data).toBe('array');
        expect(res.body.data[1].title).toEqual('add query tasks');
        expect(res.body.data[1].project_id).toEqual(2);
        done();
      });
  });

});

