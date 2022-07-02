export class User {
  readonly id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmedEmail?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
  }
}
