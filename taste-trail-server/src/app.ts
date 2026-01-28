import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './modules/auth/auth.router';
import { globalErrorHandlear } from './globalErrorHandlear/globalErrorHandlear';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [""], credentials: true, }))

app.use('/api/v1/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
    res.json({
        Welcome: 'Welcome to TasteTrail Backend',
        Developer: 'Arfan Ahmed',
        Faculty: 'Computer Science and Enginnering',
        University: 'Patuakhali Science and Technology University',
    });
});

app.use(globalErrorHandlear);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

export default app;