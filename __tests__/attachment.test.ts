import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('POST /attachment', () => {
    it('should add an attachment', (done) => {
        const attachment = {
            attachS3: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
            taskId: 1,
        };
        request(app)
            .post('/attachment')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Add attchement successfully');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0].attach_s3).to.equal('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg');
                expect(res.body.data[0].task_id).to.equal(1);
                done();
            });
    });

    it('should return an error if validation fails', (done) => {
        const attachment = {
            attachS3: 1,
            taskId: '90r',
        };
        request(app)
            .post('/attachment')
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