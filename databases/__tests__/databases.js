import request from 'supertest';
import { app } from '../../app';

describe('Test databases API', () => {
  const connection = 'mysql';
  const database = `testing_${Math.floor(Math.random() * 100)}`;

  beforeAll(async () => {
    await request(app)
      .post('/connections/activate')
      .send({ name: connection });
  });

  describe('POST /databases/ to create new database', () => {
    test('it should create a new database', async () => {
      const response = await request(app)
        .post(`/databases/${connection}`)
        .send({ name: database });
      expect(response.statusCode).toBe(204);
    });
  });

  describe('GET /databases/:name to get all databases', () => {
    test('it should return all the databases', async () => {
      const response = await request(app).get(`/databases/${connection}`);
      const found = response.body.find(db => db === database);
      expect(found).toBe(database);
    });
  });

  describe('PUT /databases/:name to use a database', () => {
    test('it should select a database', async () => {
      const response = await request(app)
        .put(`/databases/${connection}`)
        .send({ database });
      expect(response.statusCode).toBe(204);
    });
  });

  describe('DELETE /databases/:name', () => {
    test('it should delete the database', async () => {
      const response = await request(app)
        .delete(`/databases/${connection}`)
        .send({ name: database });
      expect(response.statusCode).toBe(204);
    });
  });

  //   describe('GET /databases/:name/table to get all tables');
  //   describe('POST /databases/:name/table to create a new table');
  //   describe('GET /databases/:name/:table/fields to get all columns');
  //   describe('POST /databases/:name/q to make a query');
});
