import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // ajuda a debugar
});

export default prisma;

//Singleton global do PrismaClient