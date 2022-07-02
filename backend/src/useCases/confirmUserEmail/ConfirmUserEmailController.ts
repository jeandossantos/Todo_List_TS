import { Request, Response } from 'express';
import { ConfirmUserEmailUseCase } from './ConfirmUserEmailUseCase';

export class ConfirmUserEmailController {
  constructor(private confirmUserEmailUseCase: ConfirmUserEmailUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    await this.confirmUserEmailUseCase.execute(id);

    return res.send();
  }
}
