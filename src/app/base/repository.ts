export default interface Repository<T> {
  create: (data: T) => Promise<T>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
  find: (id: string) => Promise<T>;
  findAll: (filter: any) => Promise<T[]>;
}
