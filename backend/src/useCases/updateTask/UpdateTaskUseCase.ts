import { TaskRepository } from '../../repositories/implementations/TaskRepository';
import { existsOrError } from '../../utils/validators';
import { UpdateTaskDTO } from './UpdateTaskDTO';

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: UpdateTaskDTO) {
    const { userId, taskId, name, description, time, done } = task;

    if (!taskId) return;

    existsOrError(name, 'Nome da tarefa é necessário.');

    await this.taskRepository.update({
      id: taskId,
      userId,
      name,
      description,
      time,
      done,
    });
  }
}
