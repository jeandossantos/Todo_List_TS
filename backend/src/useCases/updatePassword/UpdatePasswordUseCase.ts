import { compareSync } from 'bcrypt';

import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CustomException } from '../../exceptions/CustomException';
import { equalsOrError, existsOrError } from '../../utils/validators';
import { encryptPassword } from '../../utils/helpers';

export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword
  ) {
    existsOrError(currentPassword, 'Informe a senha.');
    existsOrError(newPassword, 'Informe a nova senha.');
    existsOrError(confirmNewPassword, 'Informe a confirmação da nova senha.');

    const user = await this.userRepository.findById(userId);

    const isMatch = compareSync(currentPassword, user.password);

    if (!isMatch) throw new CustomException('Senha incorreta');

    equalsOrError(newPassword, confirmNewPassword, 'Senhas não coincidem.');

    const encryptedPassword = encryptPassword(newPassword);

    await this.userRepository.updatePassword(userId, encryptedPassword);
  }
}
