import { Request, Response } from 'express';
import { UpdateUserPhotoUseCase } from './UpdateUserPhotoUseCase';

export class UpdateUserPhotoController {
  constructor(private updateUserPhotoUseCase: UpdateUserPhotoUseCase) {}

  async handle(req: Request, res: Response) {
    await this.updateUserPhotoUseCase.execute(req.userId, req.file.filename);

    return res.send({ fileName: req.file.filename });
  }
}
