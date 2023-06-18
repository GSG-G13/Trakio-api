import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';
import { log } from 'console';
import connection from '../src/database/config';


dotenv.config();

describe('POST /project/:id/attachments', () => {
    it('should add an attachment', (done) => {
        const attachment = {
            attachS3: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        };
        request(app)
            .post('/project/2/attachments?taskId=1')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('Add attachment successfully');
                expect(res.body.data[0].attach_s3).toBe('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg');
                expect(res.body.data[0].task_id).toBe(1);
                done();
            });
    });


    it('should return an error if validation fails', (done) => {
        const attachment = {
            attachSs3: 1,
        };
        request(app)
            .post('/project/2/attachments?taskId=1')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('Server Error');
                done();
            });
    });
});

describe('GET /project/:id/attachments', () => {
    it('should fetch attachments for a project', (done) => {
        const projectId = 2;
        request(app)
            .get(`/project/${projectId}/attachments`)
            .set('cookie', `token=${process.env.token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                log(res.body.message);
                expect(res.body.message).toBe('Fetch attachment successfully');
                done();
            });
    });

});
afterAll(() => {
connection.end();
});