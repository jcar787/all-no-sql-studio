import express from 'express';
import { MySql } from './lib';
import { router as connectionsRouter } from './connections';
const app = express();
console.log('in server.js', connectionsRouter);

// mw
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// outes
app.use('/connections', connectionsRouter);

app.get('/', async (req, res) => {
  res.send("It's working");
});

app.get('/databases', async (req, res) => {
  try {
    const mysql = new MySql();
    await mysql.connect();
    const databases = await mysql.getDatabases();
    res.send(databases);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(8080, () => console.log('Running on port 8080'));
