import { Router } from 'express'
import alumnoRouter from './modules/alumnos/alumnos.routes'
const router = Router()

router.use('/api/alumnos', alumnoRouter)

export default router
