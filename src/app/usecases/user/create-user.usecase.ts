import type UseCase from '@app/base/usecase';
import type CreateUserDto from '@app/dtos/user/create-user.dto';
import type UserRepository from '@app/repositories/user.repository';
import type UserEntity from '@domain/entities/user.entity';
import DomainError from '@domain/errors/domain.error';
import { left, type Either, right } from '@domain/errors/either';
import CreateUserMapper from '@domain/mappers/user/create-user.mapper';

export default class CreateUserUseCase implements UseCase {
  private readonly createUserMapper = new CreateUserMapper();

  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    args: CreateUserDto
  ): Promise<Either<DomainError | string, UserEntity>> {
    const missingParams = ['name', 'email', 'password'].filter(
      (param) => !(param in (args ?? {}))
    );

    if (missingParams.length) {
      return left('Os parâmetros name, email e password são obrigatórios');
    }

    const user = this.createUserMapper.mapFrom(args);

    const error = user.hasError();

    if (error) {
      return left(error);
    }

    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      return left(new DomainError('Usuário já existe'));
    }

    const newUser = await this.userRepository.create(user);

    return right(newUser);
  }
}
