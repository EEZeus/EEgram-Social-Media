import Express from 'express'
import {login,signup,logout } from '../controllers/auth.js';

const router = Express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)

router.get('',)
export default router;