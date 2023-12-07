import { alumnoService } from '@/modules/alumnos/alumnos.service'

export const resolver = {
  Query: {
    async alumnos() {
      return await alumnoService.index()
    },
    async alumno(_, { id }) {
      return await alumnoService.show(id)
    },
  },
  Mutation: {
    async createAlumno(_, { input }) {
      return await alumnoService.store(input)
    }
  }

}