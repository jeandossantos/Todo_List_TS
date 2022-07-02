import { UserRepository } from '../../repositories/implementations/UserRepository';

export class ConfirmUserEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    await this.userRepository.findById(userId);

    await this.userRepository.updateConfirmedEmail(userId);
  }
}
