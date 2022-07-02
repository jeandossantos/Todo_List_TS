import { prisma } from '../../connection/prisma';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<string> {
    const { name, email, password } = user;

    const { id } = await prisma.user.create({
      data: {
        name,
        email,
        password,
        tasks: {
          create: {
            name: 'Confirme seu endereço de e-mail!',
            description:
              'Confirmar endereço de e-mail para não perder sua conta NovaTask.',
          },
        },
      },
    });

    return id;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async findUsersWithEmailsUnconfirmed(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        confirmedEmail: false,
      },
    });

    return users;
  }

  async findUsersSoftDeleted(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: { not: null },
      },
    });

    return users;
  }

  async softDelete(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateDeletedAt(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }

  async removeMany(ids: string[]) {
    await prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async updateName(id: string, name: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
  async updateAvatar(id: string, avatar: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        photo: avatar,
      },
    });
  }

  async updateConfirmedEmail(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        confirmedEmail: true,
      },
    });
  }
}
