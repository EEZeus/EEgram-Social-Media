import Express from 'express'
import {login,signup,logout, checkAuth } from '../controllers/auth.js';

const router = Express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)
router.get('/',checkAuth)
router.get('',)
export default router;