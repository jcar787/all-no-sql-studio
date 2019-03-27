import mysql from 'mysql';
import BaseSql from './base';

export default class MySql extends BaseSql {
  constructor(
    host = 'localhost',
    username = 'root',
    password = '',
    port = 3306
  ) {
    super({ host, username, password, port });
    this.connection = mysql.createConnection({
      host,
      user: username,
      password
    });
  }

  connect() {
    if (this.connection.state === 'disconnected')
      return new Promise((resolve, reject) => {
        this.connection.connect(err => {
          if (err) {
            return reject(err);
          }
          console.log(this.connection.threadId);
          return resolve();
        });
      });
  }

  disconnect() {
    if (this.connection.state === 'disconnected') {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  async query(query) {
    if (this.connection.state === 'disconnected') {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, results, fields) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
        console.log('This are the results', results);
        console.log('These are the fields', fields);
      });
    });
  }

  async getDatabases() {
    try {
      const databases = await this.query('show databases');
      return databases;
    } catch (error) {
      console.error(error);
    }
  }
}
