import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      externalUserId: 'sample-id', // Replace with an actual unique ID
      username: 'sampleuser',       // Username to test
      imageUrl: 'http://example.com/sample-image.jpg', // Profile image URL
    },
  });
  console.log('User created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
