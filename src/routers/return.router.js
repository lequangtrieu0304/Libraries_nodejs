import express from 'express'
const router = express.Router()

import { returnController } from '../controllers/index.js'

router.post('/create-return', returnController.createReturn)

export default router