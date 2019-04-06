import express from 'express';
import { MySql } from './lib';
import { router as connectionsRouter } from './connections';
import morgan from 'morgan';

export const app = express();

app.disable('x-powered-by');

// mw
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// routes
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

app.use((req, res, next) => {
  return res.status(404).end();
});
