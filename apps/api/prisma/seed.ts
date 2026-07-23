import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@altarpulpitos.local';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await bcrypt.hash(password, 12) },
  });
  const category = await prisma.category.upsert({
    where: { slug: 'pulpitos' },
    update: {},
    create: { name: 'Púlpitos', slug: 'pulpitos' },
  });
  await prisma.product.upsert({
    where: { slug: 'pulpito-classico' },
    update: {},
    create: { name: 'Púlpito Clássico', slug: 'pulpito-classico', description: 'Modelo demonstrativo com acabamento refinado.', dimensions: '120 × 60 × 50 cm', categoryId: category.id, isPublished: true },
  });
}
main().finally(() => prisma.$disconnect());
