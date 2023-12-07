import { prisma } from '../client'
import { seedAlumnos } from './seeds/alumnos.seeder'
import { seedMaterias } from './seeds/materias.seeder'

async function main () {
  await executeSeeder('alumnosSeeder', seedAlumnos)
  await executeSeeder('materiasSeeder', seedMaterias)
}

async function executeSeeder (seederName: string, seederFunction: Function) {
  const seederAlreadyExecuted = await prisma.seed.findFirst({ where: { id: seederName } })

  if (seederAlreadyExecuted == null) {
    await seederFunction()

    await prisma.seed.create({ data: { id: seederName } })
    console.log(`Seeder '${seederName}' ejecutado y registrado.`)
  } else {
    console.log(`El seeder '${seederName}' ya se ha ejecutado anteriormente. No se ejecutará de nuevo.`)
  }
}

main().catch(error => {
  console.log('Error al ejecutar el seeder: ', error)
  process.exit(1)
}).finally(() => {
  void prisma.$disconnect()
})
