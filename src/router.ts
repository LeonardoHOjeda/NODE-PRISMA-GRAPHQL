import { Router } from 'express'
import alumnoRouter from './modules/alumnos/alumnos.routes'
import materiasRouter from './modules/materias/materias.routes'
const router = Router()

router.use('/api/alumnos', alumnoRouter)
router.use('/api/materias', materiasRouter)

export default router
