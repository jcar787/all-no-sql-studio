import request from 'supertest';
import { app } from '../../app';

describe('Test connections API', () => {
  describe('GET /connections', () => {
    test('/ should return a list of connections', async () => {
      const response = await request(app).get('/connections');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchSnapshot();
    });
  });
});
