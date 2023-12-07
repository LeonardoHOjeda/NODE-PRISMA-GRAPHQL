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

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profesor = await profesoresService.show(Number(req.params.id))

    res.json(profesor)
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profesor = await profesoresService.update(Number(req.params.id), req.body)

    res.json(profesor)
  } catch (error) {
    next(error)
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profesor = await profesoresService.destroy(Number(req.params.id))

    res.json(profesor)
  } catch (error) {
    next(error)
  }
}
