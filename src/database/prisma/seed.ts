import { prisma } from '../client'
import { alumnos } from './seeds/alumnos.seeder'
import { materias } from './seeds/materias.seeder'

async function main() {
  await executeSeeder('alumnosSeeder', seedAlumnos)
  await executeSeeder('materiasSeeder', seedMaterias)
}

async function executeSeeder(seederName: string, seederFunction: Function) {
  const seederAlreadyExecuted = await prisma.seed.findFirst({
    where: {
      id: seederName
    }
  })

  if (!seederAlreadyExecuted) {
    await seederFunction()

    // Registrar el seeder en la tabla `seed`
    await prisma.seed.create({
      data: {
        id: seederName
      }
    })

    console.log(`Seeder '${seederName}' ejecutado y registrado.`)
  } else {
    console.log(`El seeder '${seederName}' ya se ha ejecutado anteriormente. No se ejecutará de nuevo.`)
  }
}

async function seedAlumnos() {
  await prisma.alumno.createMany({
    data: alumnos
  })
}

async function seedMaterias() {
  await prisma.materia.createMany({
    data: materias
  })

}

main().catch(error => {
  console.log('Error al ejecutar el seeder: ', error)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})