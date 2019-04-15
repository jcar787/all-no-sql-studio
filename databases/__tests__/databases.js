import request from 'supertest';
import { app } from '../../app';

describe('Test databases API', () => {
  const connection = 'mysql';
  const database = `testing_${Math.floor(Math.random() * 100)}`;
  const table = {
    name: `my_table_${Math.floor(Math.random() * 100)}`,
    columns: {
      id: {
        options: ['int', 'auto_increment', 'primary key']
      },
      name: {
        options: ['varchar(255)', 'not null']
      }
    }
  };

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

  describe('POST /databases/:name/table to create a new table', () => {
    test('it should create a new table', async () => {
      const response = await request(app)
        .post(`/databases/${connection}/table`)
        .send({ name: table.name, columns: table.columns });
      expect(response.statusCode).toBe(204);
    });
  });

  describe('GET /databases/:name/table to get all tables', () => {
    test('it should return all the tables', async () => {
      const response = await request(app).get(`/databases/${connection}/table`);
      const found = response.body.find(tab => tab === table.name);
      expect(found).toBe(table.name);
    });
  });

  describe('GET /databases/:name/:table/fields to get all columns', () => {
    test('it should get fields', async () => {
      const response = await request(app).get(
        `/databases/${connection}/${table.name}/fields`
      );
      expect(response.body).toMatchSnapshot();
    });
  });

  describe('POST /databases/:name/q to make a query', () => {
    test('it should create a record', async () => {
      const query = `Insert into ${table.name} (name) values ('Testing')`;
      const response = await request(app)
        .post(`/databases/${connection}/q`)
        .send({ query });
      expect(response.statusCode).toBe(200);
    });

    test('it should return created record', async () => {
      const query = `Select * from ${table.name}`;
      const response = await request(app)
        .post(`/databases/${connection}/q`)
        .send({ query });
      expect(response.body).toMatchSnapshot();
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
});
