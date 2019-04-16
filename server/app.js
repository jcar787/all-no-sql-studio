import express from 'express';
import { MySql } from './lib';
import { router as connectionsRouter } from './connections';
import { router as databasesRouter } from './databases';
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
app.use('/databases', databasesRouter);

app.get('/', async (req, res) => {
  res.send("It's working");
});

app.use((req, res) => {
  return res.status(404).end();
});
