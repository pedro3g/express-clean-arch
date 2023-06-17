import type DomainError from '@domain/errors/domain.error';

export default interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  hasError: () => DomainError | null;
}
