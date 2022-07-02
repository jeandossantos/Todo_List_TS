import { Request, Response } from 'express';
import { ReactivateUserUseCase } from './ReactivateUserUseCase';

export class ReactivateUserController {
  constructor(private reactivateUserUseCase: ReactivateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const id = req.userId;

    await this.reactivateUserUseCase.execute(id);

    return res.send();
  }
}
