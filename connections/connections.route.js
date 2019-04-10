import { Router } from 'express';
import {
  createNewConnection,
  deleteConnection,
  getConnection,
  getOneConnection,
  setActiveConnection,
  updateConnection
} from './connections.controller';

const router = Router();

router
  .route('/')
  .get(getConnection)
  .post(createNewConnection);

router.post('/activate', setActiveConnection);
router
  .route('/:name')
  .get(getOneConnection)
  .put(updateConnection)
  .delete(deleteConnection);

export default router;
