import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import multer from 'multer';
import multerConfig from './config/multer';
import {
  createUserController,
  createTaskController,
  removeTaskController,
  updateTaskController,
  removeUserController,
  updateUserNameController,
  confirmUserEmailController,
  authenticateUserController,
  findTasksController,
  markTaskAsDoneOrPendingController,
  validateTokenController,
  updatePasswordController,
  updateUserPhotoController,
  reactivateUserController,
} from './useCases';

const routes = Router();

routes.post('/validateToken', (req: Request, res: Response) => {
  return validateTokenController.handle(req, res);
});

routes.post('/signup', (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

routes.post('/login', (req: Request, res: Response) => {
  return authenticateUserController.handle(req, res);
});

// User

routes.patch(
  '/users/update/password',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updatePasswordController.handle(req, res);
  }
);

routes.patch(
  '/users/update/photo',
  ensureAuthenticated,
  multer(multerConfig).single('photo'),
  (req: Request, res: Response) => {
    return updateUserPhotoController.handle(req, res);
  }
);

routes.patch('/users/:id/confirm', (req: Request, res: Response) => {
  return confirmUserEmailController.handle(req, res);
});

routes.patch(
  '/users/:name',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return updateUserNameController.handle(req, res);
  }
);

routes.patch(
  '/users/:id/reactivate',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return reactivateUserController.handle(req, res);
  }
);

routes.delete(
  '/users/:id',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return removeUserController.handle(req, res);
  }
);

// TASKS

routes.post('/tasks', ensureAuthenticated, (req: Request, res: Response) => {
  return createTaskController.handle(req, res);
});

routes.get('/tasks', ensureAuthenticated, (req: Request, res: Response) => {
  return findTasksController.handle(req, res);
});

routes.put('/tasks/:id', ensureAuthenticated, (req: Request, res: Response) => {
  return updateTaskController.handle(req, res);
});

routes.patch(
  '/tasks/:taskId/done',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return markTaskAsDoneOrPendingController.handle(req, res);
  }
);

routes.delete(
  '/tasks/:id',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return removeTaskController.handle(req, res);
  }
);

export { routes };
