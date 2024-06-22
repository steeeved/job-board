import { Router } from 'express';
import { getUser } from '../controllers/userController';

const router = Router();

router.get('/:userId', getUser);

export default router;