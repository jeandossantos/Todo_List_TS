import { TaskRepository } from '../../repositories/implementations/TaskRepository';

export class MarkTaskAsDoneOrPendingUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, statusTask: boolean) {
    await this.taskRepository.updateStatusTask(taskId, statusTask);
  }
}
