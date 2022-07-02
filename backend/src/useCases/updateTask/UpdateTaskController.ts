import { Request, Response } from 'express';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description, time, done } = req.body;
    const userId = req.userId;
    const taskId = req.params.id;

    await this.updateTaskUseCase.execute({
      userId,
      taskId,
      name,
      description,
      time,
      done,
    });

    return res.status(200).send();
  }
}
