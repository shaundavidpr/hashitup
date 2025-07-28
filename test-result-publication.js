// Test script to debug the resultPublication issue
const { PrismaClient } = require('./src/generated/prisma');

async function testResultPublication() {
  console.log('Creating Prisma client...');
  const db = new PrismaClient();
  
  try {
    console.log('Client created successfully');
    console.log('Available models on client:', Object.getOwnPropertyNames(db).filter(prop => !prop.startsWith('_') && !prop.startsWith('$')));
    
    console.log('Checking resultPublication property...');
    console.log('resultPublication exists:', 'resultPublication' in db);
    console.log('Type of resultPublication:', typeof db.resultPublication);
    
    if (db.resultPublication) {
      console.log('resultPublication methods:', Object.getOwnPropertyNames(db.resultPublication));
      
      console.log('Attempting to call findFirst...');
      const result = await db.resultPublication.findFirst({
        orderBy: {
          publishedAt: 'desc'
        }
      });
      console.log('Result:', result);
    } else {
      console.error('resultPublication is not available on the client');
    }
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await db.$disconnect();
  }
}

testResultPublication();
