import { Profesor } from '@prisma/client'
import { prisma } from '@/database/client'

class ProfesoresService {
  async index () {
    return await prisma.profesor.findMany({ where: { deletedAt: null }, orderBy: { id: 'asc' } })
  }

  async show (id: number) {
    return await prisma.profesor.findUnique({ where: { id } })
  }

  async store (data: Profesor) {
    return await prisma.profesor.create({ data })
  }

  async update (id: number, data: Profesor) {
    return await prisma.profesor.update({ where: { id }, data })
  }

  async destroy (id: number) {
    const profesorExists = await this.show(id)

    if (profesorExists == null) {
      throw new Error('Profesor no encontrado')
    }

    return await prisma.profesor.update({ where: { id }, data: { deletedAt: new Date() } })
  }

  async restore (id: number) {
    const profesorExists = await this.show(id)

    if (profesorExists == null) {
      throw new Error('Profesor no encontrado')
    }

    return await prisma.profesor.update({ where: { id }, data: { deletedAt: null } })
  }
}

export const profesoresService = new ProfesoresService()
