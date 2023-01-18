import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import dayjs from 'dayjs'

/*
 * Método HTTP: Get, Post, Put, Patch, Delete
  * Get: Buscar informações do back-end
  * Post: Criar uma informação no back-end
  * Put: Alterar uma informação no back-end
  * Patch: Alterar uma informação específica
  * Delete: Deletar uma informação no back-end
*/
export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6))
    })
    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          }),
        }
      }
    })
  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)
    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    // procura todos os hábitos que foram criados antes da data passada
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHasHabits: true
      }
    })

    const completedHabits = day?.dayHasHabits.map(dayHabit => {return dayHabit.habit_id})
    return {
      possibleHabits,
      completedHabits
    }

  })
}
