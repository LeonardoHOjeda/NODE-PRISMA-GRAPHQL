import { profesoresService } from '@/modules/profesores/profesores.service'

export const resolver = {
  Query: {
    async profesores () {
      return await profesoresService.index()
    },
    async profesor (_, { id }) {
      return await profesoresService.show(id)
    }
  },
  Mutation: {
    async createProfesor (_, { input }) {
      return await profesoresService.store(input)
    },
    async updateProfesor (_, { id, input }) {
      return await profesoresService.update(id, input)
    },
    async deleteProfesor (_, { id }) {
      return await profesoresService.destroy(id)
    }
  }

}
