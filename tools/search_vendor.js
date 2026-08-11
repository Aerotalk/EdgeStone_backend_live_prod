const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const vendors = await prisma.vendor.findMany();
  for (const v of vendors) {
    if (v.name.toLowerCase().includes('multi')) {
      console.log("Found vendor:", v.name, v.id);
      const circuits = await prisma.circuit.findMany({ where: { vendorId: v.id } });
      console.log("Circuits with this vendor:", circuits.map(c => c.id));
    }
  }
}

main().finally(() => prisma.$disconnect());
