import request from "supertest";
import dotenv from 'dotenv';
import app from "../src/app";
import buildDatabase from "../src/database/config/build";
import connection from "../src/database/config";

dotenv.config();

beforeAll(() => {
  buildDatabase();
});

// describe('Test Project Routes', () => {
//   test('Should add a new project', (done) => {
//     request(app)
//       .post('/project')
//       .set('cookie', `token=${process.env.TOKEN}`)
//       .send({
//         title: 'Team-5',
//         description: 'This is team 5 project',
//       })
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body.message).toBe('New Project added Successfully')
//         expect(res.body.data.length).toBe(1);
//         done();
//       })
//   });

//   test('Should return validation error for missing project title', (done) => {
//     request(app)
//       .post('/project')
//       .set('cookie', `token=${process.env.TOKEN}`)
//       .send({
//         description: 'This is the description for the project',
//       })
//       .expect(406)
//       .expect({'message': '\"title\" is required'})
//       .end((err, res) => {
//         if (err) return done(err);
//         done();
//       });
//   });

//   test('Should return validation error for missing project description', (done) => {
//     request(app)
//       .post('/project')
//       .set('cookie', `token=${process.env.TOKEN}`)
//       .send({
//         title:'Team 5',
//       })
//       .expect(406)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body.message).toBe('\"description\" is required');
//         done();
//       });
//   });

// });


describe('Get Project Route', () => {
  test('Should display projects', (done) => {
    request(app)
      .get('/projects')
      .set('cookie', `token=${process.env.TOKEN}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Show Projects Successfully');
        // expect(res.body.data.length).toBe(2); 
        console.log(res.body.data.length);
        
        done();
      });
  });
});

afterAll((done) => {
  connection.end();
  done();
})