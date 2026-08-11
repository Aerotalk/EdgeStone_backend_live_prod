const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT * FROM "Ticket"
    WHERE header ILIKE '%multi%'
       OR email ILIKE '%multi%';
  `;
  console.log(result);
}

main().finally(() => prisma.$disconnect());
