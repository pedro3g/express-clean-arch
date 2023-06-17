import type UserRepository from '@app/repositories/user.repository';
import UserEntity from '@domain/entities/user.entity';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default class UserPrismaRepository implements UserRepository {
  async create(data: UserEntity): Promise<UserEntity> {
    console.log(data);

    const user = await client.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    data.id = user.id;
    data.createdAt = user.createdAt;
    data.updatedAt = user.updatedAt;

    return data;
  }

  async update(id: string, data: UserEntity): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await client.user.delete({
      where: {
        id,
      },
    });
  }

  async find(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async findAll(filter: any): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }
}
