import { UserRepository } from '../../repositories/implementations/UserRepository';

export class ReactivateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    if (!userId) return;

    await this.userRepository.updateDeletedAt(userId);
  }
}
