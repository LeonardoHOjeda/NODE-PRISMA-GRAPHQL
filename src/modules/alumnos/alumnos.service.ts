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
    const alumnoExists = await this.show(data.id)

    if (alumnoExists) {
      throw new HTTPError(400, 'El alumno ya existe, no puede crearse uno nuevo con el mismo email')
    }

    const alumno = await prisma.alumno.create({
      data
    })

    return alumno
  }

  async update(id: number, data: Alumno) {
    const alumnoExists = await this.show(data.id)

    
    if (!alumnoExists) {
      throw new HTTPError(404, 'Alumno no encontrado')
    }

    const alumno = await prisma.alumno.update({
      where: {
        id
      },
      data
    })


    return alumno
  }

  async destroy(id: number) {
    const alumnoExists = await this.show(id)

    if (!alumnoExists) {
      throw new HTTPError(404, 'Alumno no encontrado')
    }

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