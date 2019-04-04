import { Router } from 'express';
import { getConnection, setActiveConnection } from './connections.controller';

console.log(__filename);

const router = Router();

router.route('/').get(getConnection);
//   .post(setActiveConnection);

router.post('/activate', setActiveConnection);

export default router;
