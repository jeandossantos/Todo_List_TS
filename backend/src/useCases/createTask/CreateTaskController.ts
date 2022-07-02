import { Request, Response } from 'express';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description, time, done } = req.body;

    const userId = req.userId;

    await this.createTaskUseCase.execute({
      userId,
      name,
      description,
      time,
      done,
    });

    return res.status(201).send();
  }
}
