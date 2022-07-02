import { TaskRepository } from '../../repositories/implementations/TaskRepository';
import { existsOrError } from '../../utils/validators';

export class RemoveTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string) {
    if (!taskId) return;
    const taskAlreadyExists = await this.taskRepository.findById(taskId);

    existsOrError(taskAlreadyExists, 'Tarefa não encontrada.');

    await this.taskRepository.remove(taskId);
  }
}
