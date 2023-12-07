import { prisma } from '@/database/client'
import { HTTPError } from '@/middlewares/error_handler'
import { Materia } from '@prisma/client'

class MateriasService {
  async index () {
    const materias = await prisma.materia.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return materias
  }

  async show (id: number) {
    const materia = await prisma.materia.findUnique({
      where: {
        id
      }
    })

    if (materia == null) {
      throw new HTTPError(404, 'Materia no encontrada')
    }

    return materia
  }

  async store (data: Materia) {
    const materia = await prisma.materia.create({
      data
    })

    return materia
  }

  async update (id: number, data: Materia) {
    const materiaExists = await this.show(id)

    if (materiaExists == null) {
      throw new HTTPError(404, 'Materia no encontrada')
    }

    const materia = await prisma.materia.update({
      where: {
        id
      },
      data
    })

    return materia
  }

  async destroy (id: number) {
    const materiaExists = await this.show(id)

    if (materiaExists == null) {
      throw new HTTPError(404, 'Materia no encontrada')
    }

    const materia = await prisma.materia.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })

    return materia
  }
}

export const materiasService = new MateriasService()
