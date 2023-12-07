import { Profesor } from '@prisma/client'
import { prisma } from '@/database/client'

class ProfesoresService {
  async index () {
    return await prisma.profesor.findMany({ orderBy: { id: 'asc' } })
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
    return await prisma.profesor.delete({ where: { id } })
  }
}

export const profesoresService = new ProfesoresService()
