const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT id, "customerCircuitId", "supplierCircuitId", "serviceDescription", "supplierServiceDescription" 
    FROM "Circuit" 
    WHERE "customerCircuitId" ILIKE '%multi%'
       OR "supplierCircuitId" ILIKE '%multi%'
       OR "serviceDescription" ILIKE '%multi%'
       OR "supplierServiceDescription" ILIKE '%multi%';
  `;
  console.log(result);
}

main().finally(() => prisma.$disconnect());
