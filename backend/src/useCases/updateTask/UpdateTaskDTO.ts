export interface UpdateTaskDTO {
  userId: string;
  taskId: string;
  name: string;
  description: string;
  done: boolean;
  time: Date;
}
