import { User } from '../entities/User';

export interface IUserRepository {
  create(user: User): Promise<string>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  softDelete(id: string): Promise<void>;
  removeMany(ids: string[]): Promise<void>;
  updateName(id: string, name: string): Promise<void>;
  updateAvatar(id: string, avatar: string): Promise<void>;
  updateDeletedAt(id: string): Promise<void>;
  updateConfirmedEmail(id: string): Promise<void>;
  findUsersWithEmailsUnconfirmed(): Promise<User[]>;
  findUsersSoftDeleted(): Promise<User[]>;
}
