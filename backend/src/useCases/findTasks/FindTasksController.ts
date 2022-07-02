import { Request, response, Response } from 'express';
import { FindTasksUseCase } from './FindTasksUseCase';

export class FindTasksController {
  constructor(private findTasksUseCase: FindTasksUseCase) {}

  async handle(req: Request, res: Response) {
    const search = req.query.search || '';
    const userId = req.userId;
    const page = req.query.page || 1;

    const tasks = await this.findTasksUseCase.execute(
      userId,
      String(search),
      Number(page)
    );

    return res.json(tasks);
  }
}
