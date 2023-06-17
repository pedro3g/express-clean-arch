import { describe, expect, it } from 'vitest';
import UserEntity from '../user.entity';
import DomainError from '@domain/errors/domain.error';

describe('User', () => {
  it('deve retornar um erro de validação caso o nome seja inválido', () => {
    const user = new UserEntity(
      null,
      '',
      'johndo@email.com',
      '123456',
      null,
      null
    );

    const error = user.hasError();

    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe('Nome precisa ter no mínimo 3 caracteres');
  });

  it('deve retornar um erro de validação caso o email seja inválido', () => {
    const user = new UserEntity(null, 'John Doe', '', '123456', null, null);

    const error = user.hasError();

    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe('Email inválido');
  });

  it('deve retornar um erro de validação caso a senha tenha menos de 6 dígitos', () => {
    const user = new UserEntity(
      null,
      'John Doe',
      'johndoe@email.com',
      '12345',
      null,
      null
    );

    const error = user.hasError();

    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe('Senha deve ter no mínimo 6 dígitos');
  });

  it('deve ser um usuário válido', () => {
    const user = new UserEntity(
      null,
      'John Doe',
      'johndoe@email.com',
      '123456',
      null,
      null
    );

    expect(user.id).toBe(null);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@email.com');
    expect(user.password).toBe('123456');
    expect(user.createdAt).toBe(null);
    expect(user.updatedAt).toBe(null);
  });
});
