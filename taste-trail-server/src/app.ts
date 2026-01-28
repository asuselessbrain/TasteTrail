import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './modules/auth/auth.router';
import { globalErrorHandlear } from './globalErrorHandlear/globalErrorHandlear';
import { categoryRoutes } from './modules/category/category.route';
import { cuisineRoutes } from './modules/cuisine/cuisine.route';
import { recipeRoutes } from './modules/recipe/recipe.route';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/cuisines', cuisineRoutes)
app.use('/api/v1/recipes', recipeRoutes)

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