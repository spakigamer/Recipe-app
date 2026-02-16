import express from 'express';
import { googleAuthentication } from '../auth/googleAuthentication.js';

const router = express.Router();

import { verifyUser } from '../auth/verifyUser.js';
import { getUser } from '../auth/getUser.js';
import { authMiddleware } from '../middleWare/authCheck.js';

router.post('/google', googleAuthentication);
router.get('/verify', authMiddleware, verifyUser);
router.get('/me', authMiddleware, getUser);

export default router;