export default class Base {
  constructor({ host, username, password, port }) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
  }

  connect() {
    throw new Error('Must implement in concrete class');
  }
}
