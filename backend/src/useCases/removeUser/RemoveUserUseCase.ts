import { UserRepository } from '../../repositories/implementations/UserRepository';

export class RemoveUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    if (!id) return;

    await this.userRepository.softDelete(id);
  }
}
