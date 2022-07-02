import { CronJob } from 'cron';
import { UserRepository } from '../repositories/implementations/UserRepository';
//
export const deletedForMoreThanAMonth = new CronJob(
  '0 0 5 */1 * *',
  async () => {
    const userRepository = new UserRepository();
    const users = await userRepository.findUsersSoftDeleted();

    if (users.length === 0) return;

    const now = new Date();

    const deletedForMoreThanAMonth = users.filter((user) => {
      const createdAt = new Date(user.deletedAt);
      const diff = Math.abs(now.getTime() - createdAt.getTime());
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days > 30) {
        return user;
      }
    });

    const ids = deletedForMoreThanAMonth.map((user) => user.id);

    await userRepository.removeMany(ids);
  }
);

deletedForMoreThanAMonth.start();
