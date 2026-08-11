const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const ticket = await prisma.ticket.findFirst({
        where: { ticketId: '#1006' },
        include: { replies: true }
    });
    
    if (ticket) {
        console.log("REPLIES:", JSON.stringify(ticket.replies, null, 2));
    } else {
        console.log("Ticket #1006 not found!");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
