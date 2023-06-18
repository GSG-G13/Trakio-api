import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('GET /api/sections', () => {
    it('should return a list of sections', (done) => {
        request(app)
            .get('/api/sections')
            .set('cookie', `token=${process.env.token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('Fetch sections Successfully');
                done();
            });
    })
});