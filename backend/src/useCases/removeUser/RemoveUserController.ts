import { Request, Response } from 'express';
import { RemoveUserUseCase } from './RemoveUserUseCase';

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    await this.removeUserUseCase.execute(id);

    return res.send();
  }
}
