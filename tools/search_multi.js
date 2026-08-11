const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const circuits = await prisma.circuit.findMany();
  
  let found = false;
  for (const c of circuits) {
    const str = JSON.stringify(c).toLowerCase();
    if (str.includes('multi')) {
      console.log("Found circuit with 'multi':", c.id, c.customerCircuitId);
      found = true;
    }
  }
  if (!found) {
    console.log("No circuit with 'multi' found in general fields.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
