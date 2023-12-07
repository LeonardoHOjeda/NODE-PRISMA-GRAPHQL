import { Router } from 'express'
import alumnoRouter from './modules/alumnos/alumnos.routes'
import materiasRouter from './modules/materias/materias.routes'
import profesoresRouter from './modules/profesores/profesores.routes'

const router = Router()

router.use('/api/alumnos', alumnoRouter)
router.use('/api/materias', materiasRouter)
router.use('/api/profesores', profesoresRouter)

export default router
