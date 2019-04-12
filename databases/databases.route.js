import { Router } from 'express';
import {
  createNewDatabase,
  deleteDatabase,
  getDatabases,
  getTables,
  showFields,
  useDatabase,
  queryDatabase
} from './databases.controller';

const router = Router();

router
  .route('/:name')
  .get(getDatabases)
  .put(useDatabase)
  .post(createNewDatabase)
  .delete(deleteDatabase);

router.route('/:name/table').get(getTables);

router.route('/:name/:table/fields').get(showFields);

router.route('/:name/q').post(queryDatabase);

export default router;
