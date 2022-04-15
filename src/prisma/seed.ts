import { parse } from 'csv-parse/sync'
import fs from 'fs'
import { resolve } from 'path'
import { prisma } from './'

async function main() {
  const csv = resolve('src/prisma/fixtures/user.csv')
  const data = fs.readFileSync(csv)
  const records = parse(data) as [string, string][]
  for (const record of records) {
    await prisma.user.create({
      data: {
        name: record[0],
        email: record[1],
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
