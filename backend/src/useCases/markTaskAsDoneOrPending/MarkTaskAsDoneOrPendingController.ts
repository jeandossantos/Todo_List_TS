import { Request, Response } from 'express';
import { MarkTaskAsDoneOrPendingUseCase } from './MarkTaskAsDoneOrPendingUseCase';

export class MarkTaskAsDoneOrPendingController {
  constructor(
    private markTaskAsDoneOrPendingUseCase: MarkTaskAsDoneOrPendingUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { taskStatus } = req.body;
    const { taskId } = req.params;

    await this.markTaskAsDoneOrPendingUseCase.execute(taskId, taskStatus);

    return res.send();
  }
}
