import { UserRepository } from '../../repositories/implementations/UserRepository';
import { existsOrError } from '../../utils/validators';

export class UpdateUserNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, userName: string) {
    existsOrError(userName, 'Nome é necessário.');

    await this.userRepository.updateName(id, userName);
  }
}
