import Express from 'express'
import {getMessages,addMessages } from '../controllers/message.js';

const router = Express.Router()

router.post('/',getMessages)
router.post('/send',addMessages)

export default router;