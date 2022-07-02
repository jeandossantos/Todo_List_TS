import { Request, Response } from 'express';
import { UpdatePasswordUseCase } from './UpdatePasswordUseCase';

export class UpdatePasswordController {
  constructor(private updatePasswordUseCase: UpdatePasswordUseCase) {}

  async handle(req: Request, res: Response) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const { userId } = req;

    await this.updatePasswordUseCase.execute(
      userId,
      currentPassword,
      newPassword,
      confirmNewPassword
    );

    return res.send();
  }
}
