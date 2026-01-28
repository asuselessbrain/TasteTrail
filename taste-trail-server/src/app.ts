import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [""], credentials: true, }))

app.get('/', (req: Request, res: Response) => {
    res.json({
        Welcome: 'Welcome to TasteTrail Backend',
        Developer: 'Arfan Ahmed',
        Faculty: 'Computer Science and Enginnering',
        University: 'Patuakhali Science and Technology University',
    });
});

export default app;