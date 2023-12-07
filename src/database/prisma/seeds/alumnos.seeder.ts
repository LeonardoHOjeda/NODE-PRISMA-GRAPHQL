import { prisma } from '@/database/client'
import { Alumno } from '@prisma/client'
import { faker } from '@faker-js/faker'

// Función para generar datos aleatorios
const generateRandomAlumno = (): Omit<Alumno, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> => {
  return {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }
}

// Generar un array de alumnos utilizando faker
export const generateAlumnos = (quantity: number): Array<Omit<Alumno, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> => {
  const alumnos: Array<Omit<Alumno, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = []
  for (let i = 0; i < quantity; i++) {
    alumnos.push(generateRandomAlumno())
  }
  return alumnos
}

// Generar 5 alumnos aleatorios
export const alumnos: Array<Omit<Alumno, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = generateAlumnos(5)

export async function seedAlumnos () {
  await prisma.alumno.createMany({
    data: alumnos
  })
}
