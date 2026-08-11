const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const targetId = "BA/SG1-DX1-FR5/ESPL-013";
  const circuit = await prisma.circuit.findUnique({
    where: { customerCircuitId: targetId }
  });
  
  if (circuit) {
    console.log("Found circuit:", circuit.id, circuit.customerCircuitId);
    
    // delete relations manually if they exist
    try { await prisma.sla.deleteMany({ where: { circuitId: circuit.id } }); } catch(e){}
    try { await prisma.ticket.updateMany({ where: { circuitId: circuit.id }, data: { circuitId: null } }); } catch(e){}
    try { await prisma.vendorCircuit.deleteMany({ where: { circuitId: circuit.id } }); } catch(e){}
    try { await prisma.circuitSLAValue.deleteMany({ where: { circuitId: circuit.id } }); } catch(e){}
    
    await prisma.circuit.delete({ where: { id: circuit.id } });
    console.log("Deleted circuit successfully.");
  } else {
    console.log("Circuit not found:", targetId);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
