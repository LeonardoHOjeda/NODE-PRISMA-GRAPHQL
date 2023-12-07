import { NextFunction, Request, Response } from 'express'
import { alumnoService } from './alumnos.service'

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const alumnos = await alumnoService.index()

    res.json(alumnos)
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alumno = await alumnoService.show(Number(req.params.id))

    res.json(alumno)
  } catch (error) {
    next(error)
  }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alumno = await alumnoService.store(req.body)

    res.json(alumno)
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alumno = await alumnoService.update(Number(req.params.id), req.body)

    res.json(alumno)
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alumno = await alumnoService.destroy(Number(req.params.id))

    res.json(alumno)
  } catch (error) {
    next(error)
  }
}
