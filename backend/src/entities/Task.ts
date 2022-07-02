export class Task {
  readonly id?: string;
  userId: string;
  name: string;
  description?: string;
  time?: Date;
  done?: boolean;
  createdAt?: Date;

  constructor(props: Omit<Task, 'id'>, id?: string) {
    Object.assign(this, props);
  }
}
