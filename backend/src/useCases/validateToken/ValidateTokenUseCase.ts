import { UserRepository } from '../../repositories/implementations/UserRepository';

export class ValidateTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
