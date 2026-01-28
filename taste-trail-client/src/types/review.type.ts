import { IRecipe } from "./recipe.type";

export type IUserSummary = {
    _id: string;
    fullName: string;
    email: string;
    profilePhoto: string
};

export type IReview = {
    _id: string;
    userId: IUserSummary;
    recipeId: IRecipe;
    rating: number; // 1–5
    comment: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
};
