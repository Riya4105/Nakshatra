import { Router } from 'express';
import { listUsers, createUser } from '../controllers/users.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.get('/users', listUsers);
router.post('/users', createUser);

export default router;
