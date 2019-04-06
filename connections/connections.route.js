import { Router } from 'express';
import {
  getConnection,
  setActiveConnection,
  createNewConnection
} from './connections.controller';

const router = Router();

router
  .route('/')
  .get(getConnection)
  .post(createNewConnection);

router.post('/activate', setActiveConnection);

export default router;
