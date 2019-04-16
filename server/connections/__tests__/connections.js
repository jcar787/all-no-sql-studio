import request from 'supertest';
import { app } from '../../app';
import { merge } from 'lodash';

describe('Test connections API', () => {
  let testConnection = {
    connection: {
      type: 'mongo',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 8888
    }
  };
  const name = 'connection';

  describe('GET /connections', () => {
    test('/connections should return a list of connections', async () => {
      const response = await request(app).get('/connections');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchSnapshot();
    });

    describe('GET /connections/:name', () => {
      test('/connections/mysql should return one connection', async () => {
        const response = await request(app).get('/connections/mysql');
        expect(response.statusCode).toBe(200);
        expect(response.body.connection).toMatchSnapshot();
      });
      test('/connections/dontexist should return 404', async () => {
        const response = await request(app).get('/connections/dontexist');
        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('POST /connections', () => {
    test('/connections should create a new connection', async () => {
      const response = await request(app)
        .post('/connections')
        .send(merge(testConnection, { connection: { name } }));
      expect(response.statusCode).toBe(204);
    });
    test('/connections should throw an error connection exists', async () => {
      const response = await request(app)
        .post('/connections')
        .send(merge(testConnection, { connection: { name } }));
      expect(response.statusCode).toBe(500);
    });
    test('/connections/:name should return created connection', async () => {
      const response = await request(app).get(`/connections/${name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.connection).toMatchSnapshot();
    });
  });

  describe('PUT /connections/:name', () => {
    test('/connections/:name should update a connection', async () => {
      testConnection.connection.port = 27017;
      delete testConnection.connection.name;
      const response = await request(app)
        .put(`/connections/${name}`)
        .send(testConnection);
      expect(response.statusCode).toBe(204);
    });
    test('/connections/dontexit should return 404', async () => {
      const response = await request(app)
        .put(`/connections/dontexist`)
        .send(testConnection);
      expect(response.statusCode).toBe(404);
    });
    test('/connections/:name should return the updated connection ', async () => {
      const response = await request(app).get(`/connections/${name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.connection).toMatchSnapshot();
    });
  });

  describe('DELETE /connections/:name', () => {
    test('/connections/:name should delete a connection', async () => {
      const response = await request(app).delete(`/connections/${name}`);
      expect(response.statusCode).toBe(204);
    });
    test('/connections/:name should return 404', async () => {
      const response = await request(app).delete(`/connections/dontexist`);
      expect(response.statusCode).toBe(404);
    });
  });
});
