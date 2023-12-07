import { Router } from 'express'
import * as materiasController from './materias.controller'

const router = Router()

router.get('/', materiasController.index)
router.post('/', materiasController.store)

// Dynamic Routes
router.get('/:id', materiasController.show)
router.put('/:id', materiasController.update)
router.delete('/:id', materiasController.destroy)

export default router