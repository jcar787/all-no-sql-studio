import { writeFile, readFile } from 'fs';
import { MySql } from '../lib';

export const getClass = key => {
  return {
    mysql: MySql
  }[key];
};

export const getConnections = () => {
  return new Promise((resolve, reject) => {
    readFile('./saved-connections.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

export const saveConnections = connections => {
  return new Promise((resolve, reject) => {
    writeFile('./saved-connections.json', JSON.stringify(connections), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
