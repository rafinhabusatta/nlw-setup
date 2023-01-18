import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors)

/*
 * Método HTTP: Get, Post, Put, Patch, Delete
  * Get: Buscar informações do back-end
  * Post: Criar uma informação no back-end
  * Put: Alterar uma informação no back-end
  * Patch: Alterar uma informação específica
  * Delete: Deletar uma informação no back-end
*/

app.get('/', async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'Beber'
      }
    }
  });

  return habits;
})

app.listen({
  port: 3333,
}).then(() => console.log('Server is running!'))