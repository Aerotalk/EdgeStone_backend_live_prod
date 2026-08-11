const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const circuits = await prisma.circuit.findMany({
    include: { vendor: true, client: true }
  });
  
  const mapped = circuits.map(c => ({
    id: c.id,
    customerCircuitId: c.customerCircuitId,
    supplierCircuitId: c.supplierCircuitId,
    serviceDescription: c.serviceDescription,
    supplierServiceDescription: c.supplierServiceDescription
  }));
  
  console.log(JSON.stringify(mapped, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
