import { Router } from 'express'
import * as alumnoController  from './alumnos.controller'

const router = Router()

router.get('/', alumnoController.index)
router.post('/', alumnoController.store)

// Dynamic routes
router.get('/:id', alumnoController.show)
router.put('/:id', alumnoController.update)
router.delete('/:id', alumnoController.destroy)

export default router