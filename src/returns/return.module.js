import express from 'express'
const router = express.Router()

import returnController from './return.controller.js'

router.post('/create-return', returnController.createReturn)

export default router