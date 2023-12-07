import { Alumno } from '@prisma/client'
import { faker } from '@faker-js/faker'

// Función para generar datos aleatorios
const generateRandomAlumno = (): Omit<Alumno, "id" | "createdAt" | "updatedAt" | "deletedAt"> => {
  return {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }
}

// Generar un array de alumnos utilizando faker
export const generateAlumnos = (quantity: number): Omit<Alumno, "id" | "createdAt" | "updatedAt" | "deletedAt">[] => {
  const alumnos: Omit<Alumno, "id" | "createdAt" | "updatedAt" | "deletedAt">[] = []
  for (let i = 0; i < quantity; i++) {
    alumnos.push(generateRandomAlumno())
  }
  return alumnos
}

// Generar 5 alumnos aleatorios
export const alumnos: Omit<Alumno, "id" | "createdAt" | "updatedAt" | "deletedAt">[] = generateAlumnos(5)
