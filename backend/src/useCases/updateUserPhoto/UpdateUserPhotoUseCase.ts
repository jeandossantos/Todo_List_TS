import { UserRepository } from '../../repositories/implementations/UserRepository';

export class UpdateUserPhotoUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, filename: string) {
    await this.userRepository.updateAvatar(userId, filename);
  }
}
