import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;

    await this.createUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
    });

    return res.status(201).send();
  }
}
