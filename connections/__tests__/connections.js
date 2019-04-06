import request from 'supertest';
import { app } from '../../app';

describe('Test connections API', () => {
  describe('GET /connections', () => {
    test('/connections should return a list of connections', async () => {
      const response = await request(app).get('/connections');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchSnapshot();
    });

    // describe('GET /connections/:name', () => {
    //   test('/connections/mysql should return one connection');
    //   test('/connections/dontexist should return 404');
    // });
  });

  //   describe('POST /connections', () => {
  //     test('/connections should create a new connection');
  //     test('/connections should throw an error connection exists');
  //     test('/connections/:name should return created connection');
  //   });

  //   describe('PUT /connections/:name', () => {
  //     test('/connections/:name should update a connection');
  //     test('/connections/:name should return 404');
  //   });

  //   describe('DELETE /connections/:name', () => {
  //     test('/connections/:name should delete a connection');
  //     test('/connections/:name should return 404');
  //   });
});
