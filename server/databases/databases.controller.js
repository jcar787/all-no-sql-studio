import { activeConnections } from '../connections';

export const getDatabases = async (req, res) => {
  try {
    const { name } = req.params;
    if (name in activeConnections) {
      const databases = await activeConnections[name].getDatabases();
      return res.json(databases);
    } else {
      return res.status(404).json({ message: 'Profile connection not chosen' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const useDatabase = async (req, res) => {
  try {
    const { name } = req.params;
    if (name in activeConnections) {
      const { database } = req.body;
      await activeConnections[name].useDatabase(database);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: 'Profile connection not chosen' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const getTables = async (req, res) => {
  try {
    const { name } = req.params;
    const tables = await activeConnections[name].getTables();
    return res.json(tables);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const showFields = async (req, res) => {
  try {
    const { name, table } = req.params;
    const fields = await activeConnections[name].getFields(table);
    return res.json(fields);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const queryDatabase = async (req, res) => {
  try {
    const { name } = req.params;
    const { query } = req.body;
    const rows = await activeConnections[name].query(query);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const createNewDatabase = async (req, res) => {
  try {
    const { name } = req.params;
    const { name: dbName } = req.body;
    const dbCreated = activeConnections[name].createDatabase(dbName);
    if (dbCreated) {
      return res.status(204).end();
    }
    return res.status(500).json({ message: 'Database not created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const deleteDatabase = async (req, res) => {
  try {
    const { name } = req.params;
    const { name: dbName } = req.body;
    const dbDeleted = activeConnections[name].deleteDatabase(dbName);
    if (dbDeleted) {
      return res.status(204).end();
    }
    return res.status(500).json({ message: 'Database not deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};

export const createTable = async (req, res) => {
  try {
    const { name } = req.params;
    const { name: tableName, columns } = req.body;
    const tableCreated = await activeConnections[name].createTable(
      tableName,
      columns
    );
    if (tableCreated) {
      return res.status(204).end();
    }
    return res.status(500).json({ message: 'Table created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something unexpected happened' });
  }
};
