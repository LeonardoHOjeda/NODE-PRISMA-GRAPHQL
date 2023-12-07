import { Materia } from '@prisma/client'
import { faker } from '@faker-js/faker'

// Función para generar datos aleatorios
const generateRandomMateria = (): Omit<Materia, "id" | "createdAt" | "updatedAt" | "deletedAt"> => {
  return {
    name: faker.lorem.words(1),
    clave: faker.lorem.words(1),
    profesorId: 1
  }
}

// Generar un array de alumnos utilizando faker
export const generateMaterias = (quantity: number): Omit<Materia, "id" | "createdAt" | "updatedAt" | "deletedAt">[] => {
  const materias: Omit<Materia, "id" | "createdAt" | "updatedAt" | "deletedAt">[] = []
  for (let i = 0; i < quantity; i++) {
    materias.push(generateRandomMateria())
  }
  return materias
}

// Generar 5 alumnos aleatorios
export const materias: Omit<Materia, "id" | "createdAt" | "updatedAt" | "deletedAt">[] = generateMaterias(5)
