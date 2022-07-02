import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ValidateTokenUseCase } from './ValidateTokenUseCase';

type TokenType = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
  sub: string;
};

export class ValidateTokenController {
  constructor(private validateTokenUseCase: ValidateTokenUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) return res.status(401).send(false);

      const payload = verify(token, process.env.SECRET_OR_KEY) as TokenType;

      const userFromDB = await this.validateTokenUseCase.execute(payload.id);

      if (!userFromDB) return res.status(401).send(false);

      return res.send(true);
    } catch (error) {
      return res.status(401).send(false);
    }
  }
}
