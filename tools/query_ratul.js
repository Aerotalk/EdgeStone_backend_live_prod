const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const vendors = await prisma.vendor.findMany({
        where: {
            emails: {
                hasSome: ['ratuldas.work@gmail.com']
            }
        }
    });
    console.log("VENDORS:", JSON.stringify(vendors, null, 2));

    const clients = await prisma.client.findMany({
        where: {
            emails: {
                hasSome: ['ratuldas.work@gmail.com']
            }
        }
    });
    console.log("CLIENTS:", JSON.stringify(clients, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
