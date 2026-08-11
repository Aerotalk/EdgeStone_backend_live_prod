const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Fixing existing vendor categories...");
    const result = await prisma.reply.updateMany({
        where: {
            category: {
                startsWith: 'vendor_'
            }
        },
        data: {
            category: 'vendor'
        }
    });
    console.log(`Updated ${result.count} replies to use 'vendor' category.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
