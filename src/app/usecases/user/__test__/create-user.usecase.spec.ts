import { beforeEach, describe, expect, it, vi } from 'vitest';
import CreateUserUseCase from '../create-user.usecase';
import DomainError from '@domain/errors/domain.error';
import UserMemoryRepository from '@infra/database/memory/repositories/user-memory.repository';
import UserEntity from '@domain/entities/user.entity';
import type UserRepository from '@app/repositories/user.repository';

describe('CreateUser', () => {
  let usecase: CreateUserUseCase;
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserMemoryRepository();
    usecase = new CreateUserUseCase(repository);
  });

  it('deve retornar uma erro caso os dados do usuário não sejam informados', async () => {
    const user = undefined;

    const result = await usecase.execute(user);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(
      'Os parâmetros name, email e password são obrigatórios'
    );
  });

  it('deve retornar um erro de validação caso os dados do usuário sejam inválidos', async () => {
    const user = {
      name: '',
      email: '',
      password: '',
    };

    const result = await usecase.execute(user);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DomainError);
  });

  it('deve retornar um erro caso o usuário já exista', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    vi.spyOn(repository, 'findByEmail');

    const mockedUser = await repository.create(
      new UserEntity(null, user.name, user.email, user.password, null, null)
    );

    const result = await usecase.execute(user);

    await repository.delete(mockedUser.id);

    expect(repository.findByEmail).toHaveBeenCalledWith(user.email);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DomainError);
    expect((result.value as DomainError).message).toBe('Usuário já existe');
  });

  it('deve criar um usuário', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    vi.spyOn(repository, 'findByEmail');
    vi.spyOn(repository, 'create');

    const result = await usecase.execute(user);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeInstanceOf(UserEntity);

    await repository.delete((result.value as UserEntity).id);
  });
});
