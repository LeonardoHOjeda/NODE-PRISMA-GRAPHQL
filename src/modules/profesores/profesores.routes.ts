import { Router } from 'express'
import * as profesoresController from './profesores.controller'

const router = Router()

router.get('/', profesoresController.index)
router.post('/', profesoresController.store)

// Dynamic Routes
router.get('/:id', profesoresController.show)
router.put('/:id', profesoresController.update)
router.delete('/:id', profesoresController.destroy)

export default router
