import { prisma } from '../../connection/prisma';
import { Task } from '../../entities/Task';
import { ITaskRepository } from '../ITaskRepository';

export class TaskRepository implements ITaskRepository {
  async create(task: Task): Promise<void> {
    const { name, description, time, done, userId } = task;

    await prisma.task.create({
      data: {
        name,
        description,
        done,
        time,
        userId,
      },
    });
  }

  async update(task: Task): Promise<void> {
    const { id, name, description, time, done } = task;
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        time,
        done,
      },
    });
  }

  async updateStatusTask(id: string, done: boolean): Promise<void> {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        done,
      },
    });
  }

  async find(userId: string, search: string = '', page: number = 1) {
    const limit = 4;
    const count = await prisma.task.count({
      where: {
        userId,
      },
    });

    const tasks = await prisma.task.findMany({
      take: limit,
      skip: page * limit - limit,
      where: {
        userId,
        name: {
          mode: 'insensitive',
          startsWith: search,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { tasks, count, limit };
  }

  async findById(id: string): Promise<Task> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async remove(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
