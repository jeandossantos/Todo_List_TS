import { Task } from '../entities/Task';

export type PaginatedTaskList = {
  tasks: Task[];
  count: number;
  limit: number;
};

export interface ITaskRepository {
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  find(userId: string, name?: string): Promise<PaginatedTaskList>;
  findById(id: string): Promise<Task>;
  remove(id: string): Promise<void>;
}
