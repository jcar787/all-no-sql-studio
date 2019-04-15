import { Router } from 'express';
import {
  createNewDatabase,
  createTable,
  deleteDatabase,
  getDatabases,
  getTables,
  queryDatabase,
  showFields,
  useDatabase
} from './databases.controller';

const router = Router();

router
  .route('/:name')
  .get(getDatabases)
  .put(useDatabase)
  .post(createNewDatabase)
  .delete(deleteDatabase);

router
  .route('/:name/table')
  .get(getTables)
  .post(createTable);

router.route('/:name/:table/fields').get(showFields);

router.route('/:name/q').post(queryDatabase);

export default router;
