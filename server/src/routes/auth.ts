import express from 'express'
import { getMe, loginUser, refreshToken } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/login',loginUser);
router.post('/refresh-token',refreshToken);
router.get('/me',authProtect,getMe);

export default router;