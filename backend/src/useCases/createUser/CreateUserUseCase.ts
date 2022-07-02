import { IMailProvider } from '../../providers/IMailProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { encryptPassword } from '../../utils/helpers';
import {
  equalsOrError,
  existsOrError,
  notExistsOrError,
  validateEmail,
} from '../../utils/validators';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: CreateUserDTO) {
    const { name, email, password, confirmPassword } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    notExistsOrError(userAlreadyExists, 'Usuário(a) já cadastrado(a).');
    existsOrError(name, 'Nome é obrigatório.');
    validateEmail(email, 'E-mail é obrigatório.');
    equalsOrError(password, confirmPassword, 'Senhas não coincidem.');

    const passwordHash = encryptPassword(password);

    const id = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      from: {
        name: 'Equipe NovaTask',
        email: 'equipe-novatask@mailer.com',
      },
      subject: 'Confirmação de e-mail do NovaTask',
      body: [
        `<h1>Bem-vindo(a) ao NovaTask</h1>`,
        `<p>Sua conta no(a) NovaTask está quase pronta. Para ativá-la, por favor confirme o seu endereço de email clicando no link abaixo.</p>`,
        `<p><a href="http://localhost:3000/confirm-email?id=${id}">
            Ativar minha conta/Confirmar meu email</a> e confirme agora!.</p>`,
        `<p>Esse link só será válido por 30 minutos. Depois disso o cadastro será apagado automaticamente.</p>`,
        `<p>Se você não se cadastrou no(a) NovaTask recentemente, por favor ignore este email.</p>`,
        `<p>Obrigado(a) pela atenção.</p>`,
      ].join(),
    });
  }
}
