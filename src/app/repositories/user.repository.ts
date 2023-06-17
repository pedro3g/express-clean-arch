import type Repository from '@app/base/repository';
import type UserEntity from '@domain/entities/user.entity';

export default abstract class UserRepository implements Repository<UserEntity> {
  abstract create(data: UserEntity): Promise<UserEntity>;
  abstract update(id: string, data: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<UserEntity | null>;
  abstract findAll(filter: any): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
