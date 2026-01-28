import { ICategory } from "./category.type";
import { ICuisine } from "./cuisine.type";

export type IRecipe = {
    _id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    categoryId: ICategory;
    cuisineId: ICuisine;
    cookingTime: number;
    calories: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
};