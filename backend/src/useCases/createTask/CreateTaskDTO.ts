export interface CreateTaskDTO {
  userId: string;
  name: string;
  description: string;
  time: Date;
  done: boolean;
}
