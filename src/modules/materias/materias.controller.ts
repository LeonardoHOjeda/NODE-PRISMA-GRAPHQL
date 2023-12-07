import { NextFunction, Request, Response } from 'express'
import { materiasService } from './materias.service'

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const materias = await materiasService.index()

    res.json(materias)
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const materia = await materiasService.show(Number(req.params.id))

    res.json(materia)
  } catch (error) {
    next(error)
  }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const materia = await materiasService.store(req.body)

    res.json(materia)
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const materia = await materiasService.update(Number(req.params.id), req.body)

    res.json(materia)
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const materia = await materiasService.destroy(Number(req.params.id))

    res.json(materia)
  } catch (error) {
    next(error)
  }
}
