export interface IService<T> {
  all(): Promise<T[]>;
  findOne(id: string): Promise<T|undefined>;
}
