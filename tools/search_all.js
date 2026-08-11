const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const vendors = await prisma.vendor.findMany();
  for (const v of vendors) {
    if (JSON.stringify(v).toLowerCase().includes('multi')) console.log("Vendor", v);
  }
  
  const clients = await prisma.client.findMany();
  for (const c of clients) {
    if (JSON.stringify(c).toLowerCase().includes('multi')) console.log("Client", c);
  }
  
  const vendorCircuits = await prisma.vendorCircuit.findMany();
  for (const vc of vendorCircuits) {
    if (JSON.stringify(vc).toLowerCase().includes('multi')) console.log("VendorCircuit", vc);
  }
}

main().finally(() => prisma.$disconnect());
