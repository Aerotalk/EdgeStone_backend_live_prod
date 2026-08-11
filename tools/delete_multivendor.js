const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const circuits = await prisma.circuit.findMany({
    include: { vendor: true, client: true }
  });
  
  const target = circuits.find(c => 
    c.isMultiVendor === true || 
    JSON.stringify(c).toLowerCase().includes('multivendor')
  );
  
  if (target) {
    console.log("Found circuit:", target.id, target.customerCircuitId);
    
    // delete relations manually if they exist
    try { await prisma.sla.deleteMany({ where: { circuitId: target.id } }); } catch(e){}
    try { await prisma.ticket.updateMany({ where: { circuitId: target.id }, data: { circuitId: null } }); } catch(e){}
    try { await prisma.vendorCircuit.deleteMany({ where: { circuitId: target.id } }); } catch(e){}
    try { await prisma.circuitSLAValue.deleteMany({ where: { circuitId: target.id } }); } catch(e){}
    
    await prisma.circuit.delete({ where: { id: target.id } });
    console.log("Deleted successfully.");
  } else {
    console.log("No circuit with Multivendor found.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
