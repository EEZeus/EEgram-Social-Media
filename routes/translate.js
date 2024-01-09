import Express from 'express'
import {Translate} from '../controllers/translate.js';

const router = Express.Router()

router.post('/',Translate)

export default router;