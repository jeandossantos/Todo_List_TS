import { ITaskRepository } from '../../repositories/ITaskRepository';
import { existsOrError } from '../../utils/validators';
import { CreateTaskDTO } from './CreateTaskDTO';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: CreateTaskDTO) {
    const { userId, name, description, time, done } = task;
    console.log(userId);
    existsOrError(userId, 'Tarefa deve ter um dono.');
    existsOrError(name, 'Nome da tarefa é necessário.');

    await this.taskRepository.create({
      userId,
      name,
      description,
      time,
      done,
    });
  }
}
