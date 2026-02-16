import express from 'express';
import { googleAuthentication } from '../auth/googleAuthentication.js';
import { verifyUser } from '../auth/verifyUser.js';
import { getUser } from '../auth/getUser.js';
import { authMiddleware } from '../middleWare/authCheck.js';
import { markRecipeAsCooked } from '../auth/cooked.js';

const router = express.Router();

router.post('/google', googleAuthentication);
router.get('/verify', authMiddleware, verifyUser);
router.get('/me', authMiddleware, getUser);
router.post('/cooked', authMiddleware, markRecipeAsCooked);

export default router;