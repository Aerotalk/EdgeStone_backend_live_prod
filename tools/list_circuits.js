const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const circuits = await prisma.circuit.findMany({
    include: { vendor: true, client: true }
  });
  console.log(JSON.stringify(circuits, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
