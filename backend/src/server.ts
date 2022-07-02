import 'express-async-errors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { routes } from './routes';
import { CustomException } from './exceptions/CustomException';
import './schedules';

config();

const app = express();

app.use(
  cors({
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use('/static', express.static(__dirname + '/public'));
app.use(routes);
app.use(
  (
    error: CustomException | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof CustomException) {
      return res.status(error.code).json({
        message: error.message,
        code: error.code,
      });
    }

    console.error(error.message || 'Unexpected error.');

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);

app.listen(3001, () => console.log('Back-end running on port 3001...'));
