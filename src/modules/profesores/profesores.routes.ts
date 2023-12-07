import { Router } from 'express'
import * as profesoresController from './profesores.controller'

const router = Router()

router.get('/', profesoresController.index)
router.post('/', profesoresController.store)

export default router
