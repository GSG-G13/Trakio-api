import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';
import connection from '../src/database/config';

dotenv.config();

describe('POST /project/:id/attachments', () => {
    it('should add an attachment', async () => {
        const attachment = {
            attachS3: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        };

        const response = await request(app)
            .post('/project/2/attachments?taskId=1')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Add attachment successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data[0].attach_s3).toBe('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg');
        expect(response.body.data[0].task_id).toBe(1);
    });

    it('should return an error if validation fails', async () => {
        const attachment = {
            attachSs3: 1,
        };

        const response = await request(app)
            .post('/project/2/attachments?taskId=1')
            .set('cookie', `token=${process.env.token}`)
            .send(attachment);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Server Error');
    });
});

describe('GET /project/:id/attachments', () => {
    it('should fetch attachments for a project', async () => {
        const projectId = 2;

        const response = await request(app)
            .get(`/project/${projectId}/attachments`)
            .set('cookie', `token=${process.env.token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Fetch attachment successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});

afterAll(() => {
    connection.end();
});
