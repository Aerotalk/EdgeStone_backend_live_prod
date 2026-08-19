const prisma = require('../models/index');

async function main() {
    const vendors = await prisma.vendor.findMany();
    const clients = await prisma.client.findMany();
    console.log('Vendors with soumyajit:', JSON.stringify(vendors.filter(v => v.emails.some(e => e.includes('soumyajit'))), null, 2));
    console.log('Clients with soumyajit:', JSON.stringify(clients.filter(c => c.emails.some(e => e.includes('soumyajit'))), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
