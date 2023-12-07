import { NextFunction, Request, Response } from 'express'
import { profesoresService } from './profesores.service'

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const profesores = await profesoresService.index()

    res.json(profesores)
  } catch (error) {
    next(error)
  }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profesor = await profesoresService.store(req.body)

    res.json(profesor)
  } catch (error) {
    next(error)
  }
}
