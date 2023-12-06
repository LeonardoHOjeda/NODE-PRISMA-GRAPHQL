import { Alumno } from '@prisma/client'
import { prisma } from '@/database/client'
import { HTTPError } from '@/middlewares/error_handler'

class AlumnoService {
  async index() {
    const alumnos = await prisma.alumno.findMany({
      orderBy: {
        id: 'asc'
      },
      where: {
        deletedAt: null
      }
    })

    return alumnos
  }

  async show(id: number) {
    const alumno = await prisma.alumno.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    if (!alumno) {
      throw new HTTPError(404, 'Alumno no encontrado')
    }

    return alumno
  }

  async store(data: Alumno) {
    const alumno = await prisma.alumno.create({
      data
    })

    return alumno
  }

  async update(id: number, data: Alumno) {
    const alumno = await prisma.alumno.update({
      where: {
        id
      },
      data
    })

    if (!alumno) {
      throw new HTTPError(404, 'Alumno no encontrado')
    }

    return alumno
  }

  async destroy(id: number) {
    const alumno = await prisma.alumno.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })

    return alumno
  }
}

export const alumnoService = new AlumnoService()