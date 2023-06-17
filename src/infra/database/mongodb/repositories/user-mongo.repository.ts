import type UserRepository from '@app/repositories/user.repository';
import User from '../models/user.model';
import UserEntity from '@domain/entities/user.entity';

export default class UserMongoRepository implements UserRepository {
  async create(data: UserEntity): Promise<UserEntity> {
    const user = await User.create(data);

    data.id = user.id;
    data.createdAt = user.createdAt;
    data.updatedAt = user.updatedAt;

    return data;
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findAll(filter: any): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await User.findOne({ email });

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
