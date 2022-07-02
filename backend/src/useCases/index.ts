import { MailtrapMailProvider } from '../providers/implementations/MailtrapMailProvider';
import { TaskRepository } from '../repositories/implementations/TaskRepository';
import { UserRepository } from '../repositories/implementations/UserRepository';
import { AuthenticateUserController } from './AuthenticateUser/AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUser/AuthenticateUserUseCase';
import { ConfirmUserEmailController } from './confirmUserEmail/ConfirmUserEmailController';
import { ConfirmUserEmailUseCase } from './confirmUserEmail/ConfirmUserEmailUseCase';
import { CreateTaskController } from './createTask/CreateTaskController';
import { CreateTaskUseCase } from './createTask/CreateTaskUseCase';
import { CreateUserController } from './createUser/CreateUserController';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';
import { FindTasksController } from './findTasks/FindTasksController';
import { FindTasksUseCase } from './findTasks/FindTasksUseCase';
import { MarkTaskAsDoneOrPendingController } from './markTaskAsDoneOrPending/MarkTaskAsDoneOrPendingController';
import { MarkTaskAsDoneOrPendingUseCase } from './markTaskAsDoneOrPending/MarkTaskAsDoneOrPendingUseCase';
import { ReactivateUserController } from './reactivateUser/ReactivateUserController';
import { ReactivateUserUseCase } from './reactivateUser/ReactivateUserUseCase';
import { RemoveTaskController } from './removeTask/RemoveTaskController';
import { RemoveTaskUseCase } from './removeTask/RemoveTaskUseCase';
import { RemoveUserController } from './removeUser/RemoveUserController';
import { RemoveUserUseCase } from './removeUser/RemoveUserUseCase';
import { UpdatePasswordController } from './updatePassword/UpdatePasswordController';
import { UpdatePasswordUseCase } from './updatePassword/UpdatePasswordUseCase';
import { UpdateTaskController } from './updateTask/UpdateTaskController';
import { UpdateTaskUseCase } from './updateTask/UpdateTaskUseCase';
import { UpdateUserNameController } from './updateUserName/UpdateUserNameController';
import { UpdateUserNameUseCase } from './updateUserName/UpdateUserNameUseCase';
import { UpdateUserPhotoController } from './updateUserPhoto/UpdateUserPhotoController';
import { UpdateUserPhotoUseCase } from './updateUserPhoto/UpdateUserPhotoUseCase';
import { ValidateTokenController } from './validateToken/ValidateTokenController';
import { ValidateTokenUseCase } from './validateToken/ValidateTokenUseCase';

const userRepository = new UserRepository();

const mailtrapMailProvider = new MailtrapMailProvider();

const validateTokenUseCase = new ValidateTokenUseCase(userRepository);
const validateTokenController = new ValidateTokenController(
  validateTokenUseCase
);

// AUTH

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

// USER

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  mailtrapMailProvider
);
const createUserController = new CreateUserController(createUserUseCase);

const removeUserUseCase = new RemoveUserUseCase(userRepository);
const removeUserController = new RemoveUserController(removeUserUseCase);

const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository);
const updatePasswordController = new UpdatePasswordController(
  updatePasswordUseCase
);

const updateUserPhotoUseCase = new UpdateUserPhotoUseCase(userRepository);
const updateUserPhotoController = new UpdateUserPhotoController(
  updateUserPhotoUseCase
);

const updateUserNameUseCase = new UpdateUserNameUseCase(userRepository);
const updateUserNameController = new UpdateUserNameController(
  updateUserNameUseCase
);

const reactivateUserUseCase = new ReactivateUserUseCase(userRepository);
const reactivateUserController = new ReactivateUserController(
  reactivateUserUseCase
);

const confirmUserEmailUseCase = new ConfirmUserEmailUseCase(userRepository);
const confirmUserEmailController = new ConfirmUserEmailController(
  confirmUserEmailUseCase
);

// tasks
const taskRepository = new TaskRepository();

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

const findTasksUseCase = new FindTasksUseCase(taskRepository);
const findTasksController = new FindTasksController(findTasksUseCase);

const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const updateTaskController = new UpdateTaskController(updateTaskUseCase);

const markTaskAsDoneOrPendingUseCase = new MarkTaskAsDoneOrPendingUseCase(
  taskRepository
);
const markTaskAsDoneOrPendingController = new MarkTaskAsDoneOrPendingController(
  markTaskAsDoneOrPendingUseCase
);

const removeTaskUseCase = new RemoveTaskUseCase(taskRepository);
const removeTaskController = new RemoveTaskController(removeTaskUseCase);

export {
  authenticateUserController,
  authenticateUserUseCase,
  validateTokenController,
  validateTokenUseCase,
  createUserController,
  createUserUseCase,
  removeUserController,
  removeUserUseCase,
  updateUserNameController,
  updateUserNameUseCase,
  updatePasswordController,
  updatePasswordUseCase,
  updateUserPhotoController,
  updateUserPhotoUseCase,
  reactivateUserController,
  reactivateUserUseCase,
  confirmUserEmailController,
  confirmUserEmailUseCase,
  findTasksController,
  findTasksUseCase,
  createTaskController,
  createTaskUseCase,
  markTaskAsDoneOrPendingController,
  markTaskAsDoneOrPendingUseCase,
  removeTaskController,
  removeTaskUseCase,
  updateTaskController,
  updateTaskUseCase,
};
