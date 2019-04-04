import connections from '../saved-connections';
import { MySql } from '../lib';

const activeConnections = {};

const getClass = key => {
  return {
    mysql: MySql
  }[key];
};

export const getConnection = async (req, res) => res.json(connections);
export const setActiveConnection = async (req, res) => {
  try {
    const { connection } = req.body;
    if (connection in activeConnections) {
      await activeConnections[connection].connect();
      res.status(204).end();
    } else if (connection in connections) {
      const { host, username, password, port } = connections[connection];
      const DBClass = getClass(connection);
      activeConnections[connection] = new DBClass({
        host,
        username,
        password,
        port
      });
      await activeConnections[connection].connect();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'No connection exist' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};
