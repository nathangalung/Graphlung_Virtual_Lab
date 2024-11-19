import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

prisma.$on('error', (e) => {
  console.error('Database connection error:', e);
});

prisma.$use(async (params, next) => {
  const start = Date.now();
  const result = await next(params);
  const duration = Date.now() - start;
  console.log(`Query ${params.model}.${params.action} took ${duration}ms`);
  return result;
});

export default prisma;