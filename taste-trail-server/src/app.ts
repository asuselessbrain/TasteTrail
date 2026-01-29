import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.router";
import { globalErrorHandlear } from "./globalErrorHandlear/globalErrorHandlear";
import { categoryRoutes } from "./modules/category/category.route";
import { cuisineRoutes } from "./modules/cuisine/cuisine.route";
import { recipeRoutes } from "./modules/recipe/recipe.route";
import { reviewRoutes } from "./modules/review/review.route";
import { favoriteRoutes } from "./modules/favorite/favorite.route";
import { mealPlannerRoutes } from "./modules/mealPlanner/mealPlanner.route";
import { cookingHistoryRoutes } from "./modules/cookedHistory/cookingHistory.route";
import { groceryListRoutes } from "./modules/groceryList/groceryList.router";
import { dashboardDataRoutes } from "./modules/dashboardData/dashboardData.route";
const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://taste-trail-client.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cuisines", cuisineRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/meal-planner", mealPlannerRoutes);
app.use("/api/v1/cooked-history", cookingHistoryRoutes);
app.use("/api/v1/grocery-list", groceryListRoutes);
app.use("/api/v1/dashboard-data", dashboardDataRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    Welcome: "Welcome to TasteTrail Backend",
    Developer: "Arfan Ahmed",
    Faculty: "Computer Science and Enginnering",
    University: "Patuakhali Science and Technology University",
  });
});

app.use(globalErrorHandlear);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

export default app;
