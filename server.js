import express from 'express';
import { MySql } from './lib';
import { router as connectionsRouter } from './connections';
import morgan from 'morgan';
const app = express();

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

app.listen(8080, () => console.log('Running on port 8080'));
