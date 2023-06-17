import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

describe('POST /attachment/:id', () => {
    it('should add an attachment', (done) => {
        const attachment = {
            attachS3: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        };
        request(app)
            .post('/attachment/1')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Add attachment successfully');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].attach_s3).to.equal('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg');
                expect(res.body.data[0].task_id).to.equal(1);
                done();
            });
    });

    it('should return an error if validation fails', (done) => {
        const attachment = {
            attachS3: 1,
        };
        request(app)
            .post('/attachment/90r')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Server Error');
                done();
            });
    });
});

describe('GET /attachment/:id', () => {
    it('should fetch attachments for a project', (done) => {
        const projectId = 1;

        request(app)
            .get(`/attachment/${projectId}`)
            .set('cookie', `token=${process.env.token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                log(res.body.message);
                expect(res.body.message).to.equal('Fetch attachment successfully');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});  