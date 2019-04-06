import request from 'supertest';
import { app } from '../app';

describe('Test main routes', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  describe('GET /', () => {
    test('/ should return 200', async () => {
      const response = await request(app)
        .get('/')
        .end();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET wrong route', () => {
    test('/doesnotexist should return 404', async () => {
      const response = await request(app)
        .get('/doesnotexist')
        .end();
      expect(response.statusCode).toBe(404);
    });
  });
});
