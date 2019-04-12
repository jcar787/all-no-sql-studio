import mysql from 'mysql';
import { map, lowerFirst } from 'lodash';
import BaseSql from './base';

export default class MySql extends BaseSql {
  constructor({
    host = 'localhost',
    username = 'root',
    password = '',
    port = 3306
  }) {
    super({ host, username, password, port });
    this.connection = mysql.createConnection({
      host,
      user: username,
      password
    });
  }

  connect() {
    if (this.connection.state === 'disconnected') {
      return new Promise((resolve, reject) => {
        this.connection.connect(err => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
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
      });
    });
  }

  async getDatabases() {
    try {
      const databases = await this.query('show databases');
      return map(databases, db => db.Database);
    } catch (err) {
      console.error(err);
    }
  }

  async useDatabase(database) {
    return new Promise((resolve, reject) => {
      this.connection.changeUser({ database }, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getTables() {
    try {
      const tables = await this.query('show tables');
      return map(tables, table => {
        table.name = table['Tables_in_parties_db'];
        delete table['Tables_in_parties_db'];
        return table;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getFields(table) {
    try {
      const fields = await this.query(`describe ${table}`);
      return map(fields, field => {
        for (const key in field) {
          field[lowerFirst(key)] = field[key];
          delete field[key];
        }
        return field;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async createDatabase(name) {
    try {
      await this.query(`create database ${name}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteDatabase(name) {
    try {
      await this.query(`drop database ${name}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
