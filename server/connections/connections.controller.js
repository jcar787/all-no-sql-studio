import { assign } from 'lodash';
import { getClass, getConnections, saveConnections } from './connection.utils';

let connections = {};
export const activeConnections = {};

export const getConnection = async (req, res) => {
  try {
    connections = await getConnections();
    res.json(connections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};

export const setActiveConnection = async (req, res) => {
  try {
    const { name } = req.body;
    const connections = await getConnections();
    if (name in activeConnections) {
      await activeConnections[name].connect();
      res.status(204).end();
    } else if (name in connections) {
      const { host, username, password, port } = connections[name];
      const DBClass = getClass(name);
      activeConnections[name] = new DBClass({
        host,
        username,
        password,
        port
      });
      await activeConnections[name].connect();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'No connection exist' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};

export const createNewConnection = async (req, res) => {
  try {
    const { connection } = req.body;
    const { name } = connection;
    connections = await getConnections();
    if (name in connections) {
      return res
        .status(500)
        .json({ message: 'A connection with this name exists' });
    }

    delete connection.name;
    connections = assign(connections, { [name]: connection });
    await saveConnections(connections);
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};

export const getOneConnection = async (req, res) => {
  try {
    const { name } = req.params;
    connections = await getConnections();
    if (name in connections) {
      return res.json({ connection: connections[name] });
    } else {
      res.status(404).json({ message: `Connection ${name} doesn't exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};
export const updateConnection = async (req, res) => {
  try {
    const { name } = req.params;
    const { connection } = req.body;
    const connections = await getConnections();
    if (name in connections) {
      connections[name] = assign(connections[name], connection);
      await saveConnections(connections);
      return res.status(204).end();
    } else {
      res.status(404).json({ message: `Connection ${name} doesn't exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};
export const deleteConnection = async (req, res) => {
  try {
    const { name } = req.params;
    const connections = await getConnections();
    if (name in connections) {
      delete connections[name];
      await saveConnections(connections);
      return res.status(204).end();
    } else {
      res.status(404).json({ message: `Connection ${name} doesn't exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected error happened' });
  }
};
