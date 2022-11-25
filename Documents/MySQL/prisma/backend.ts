import { getMenu } from "./script"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

getMenu()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })