export default class BaseSql {
  constructor({ host, username, password, port }) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
  }

  connect() {
    throw new Error('Must implement in concrete class');
  }

  disconnect() {
    throw new Error('Must implement in concrete class');
  }

  query() {
    throw new Error('Must implement in concrete class');
  }

  getDatabases() {
    throw new Error('Must implement in concrete class');
  }

  getTables() {
    throw new Error('Must implement in concrete class');
  }
}
