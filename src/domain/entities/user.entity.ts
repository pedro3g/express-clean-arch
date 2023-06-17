import type Entity from '@app/base/entity';
import { emailIsValid } from '@app/helpers/validators';
import DomainError from '@domain/errors/domain.error';

export default class UserEntity implements Entity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  hasError(): DomainError | null {
    if (this.name?.length < 3) {
      return new DomainError('Nome precisa ter no mínimo 3 caracteres');
    } else if (!emailIsValid(this.email)) {
      return new DomainError('Email inválido');
    } else if (this.password.length < 6) {
      return new DomainError('Senha deve ter no mínimo 6 dígitos');
    }

    return null;
  }
}
