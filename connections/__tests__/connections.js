import request from 'supertest';
import { app } from '../../app';

describe('Test connections API', () => {
  let testConnection = {
    connection: {
      name: 'connection',
      type: 'mongo',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 8888
    }
  };
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
        .send(testConnection);
      expect(response.statusCode).toBe(204);
    });
    test('/connections should throw an error connection exists', async () => {
      const response = await request(app)
        .post('/connections')
        .send(testConnection);
      expect(response.statusCode).toBe(500);
    });
    test('/connections/:name should return created connection', async () => {
      const response = await request(app).get(
        `/connections/${testConnection.connection.name}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.connection).toMatchSnapshot();
    });
  });

  //   describe('PUT /connections/:name', () => {
  //     test('/connections/:name should update a connection');
  //     test('/connections/:name should return 404');
  //   });

  //   describe('DELETE /connections/:name', () => {
  //     test('/connections/:name should delete a connection');
  //     test('/connections/:name should return 404');
  //   });
});
