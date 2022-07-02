import { TaskRepository } from '../../repositories/implementations/TaskRepository';

export class FindTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string, search: string = '', page: number) {
    const tasks = await this.taskRepository.find(userId, search, page);

    return tasks;
  }
}
