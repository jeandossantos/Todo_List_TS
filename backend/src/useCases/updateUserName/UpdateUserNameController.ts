import { Request, Response } from 'express';
import { UpdateUserNameUseCase } from './UpdateUserNameUseCase';

export class UpdateUserNameController {
  constructor(private updateUserNameUseCase: UpdateUserNameUseCase) {}

  async handle(req: Request, res: Response) {
    const { name } = req.params;
    const id = req.userId;

    await this.updateUserNameUseCase.execute(id, name);

    return res.status(201).send();
  }
}
