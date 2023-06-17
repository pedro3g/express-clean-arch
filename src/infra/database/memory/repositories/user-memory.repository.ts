import type UserRepository from '@app/repositories/user.repository';
import type UserEntity from '@domain/entities/user.entity';

export default class UserMemoryRepository implements UserRepository {
  private users: UserEntity[] = [];

  async create(data: UserEntity): Promise<UserEntity> {
    data.id = Math.random().toString(36).substr(2, 9);
    data.createdAt = new Date();
    data.updatedAt = new Date();

    this.users.push(data);

    return data;
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    const index = this.users.indexOf(user);

    this.users[index] = data;

    return data;
  }

  async delete(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }

  async find(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findAll(filter: any): Promise<UserEntity[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
