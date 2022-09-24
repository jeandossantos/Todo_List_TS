import { CustomException } from '../../exceptions/CustomException';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new CustomException('Informe e-mail e senha.');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new CustomException('Usuário(a) não cadastrado(a).');

    const isMatch = compareSync(password, user.password);

    if (!isMatch) throw new CustomException('E-mail e/ou senha incorretos.');

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      deletedAt: user.deletedAt,
    };

    const token = sign(payload, process.env.SECRET_OR_KEY, {
      subject: user.id,
    });

    return { ...payload, token };
  }
}
