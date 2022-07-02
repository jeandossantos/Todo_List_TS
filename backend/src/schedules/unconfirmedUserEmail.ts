import { CronJob } from 'cron';
import { UserRepository } from '../repositories/implementations/UserRepository';

export const unconfirmedUserEmail = new CronJob('0 */30 * * * *', async () => {
  const userRepository = new UserRepository();

  const users = await userRepository.findUsersWithEmailsUnconfirmed();

  if (users.length === 0) return;

  const ids = users.map((user) => user.id);

  console.log('IDS', ids);
  await userRepository.removeMany(ids);
});

unconfirmedUserEmail.start();
