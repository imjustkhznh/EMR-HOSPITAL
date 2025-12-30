import { IIdentifiable } from '../models/base';

// DIP: Dependency Inversion Principle - Interface chứ không phụ thuộc concrete class
export interface IRepository<T extends IIdentifiable> {
  getAll(): T[];
  getById(id: string): T | undefined;
  add(item: T): T[];
  update(id: string, updates: Partial<T>): T[];
  delete(id: string): T[];
}
