import { queryBuilder } from "../../builder/queryBuilder";
import { Recipe } from "./recipe.medel";
import { IRecipe } from "./recipe.type";

const createRecipe = async (data: IRecipe) => {
    const recipe = new Recipe(data);

    return await recipe.save()
}

const getAllRecipes = async (options: Record<string, any>) => {

    const { filters, search, sortBy, sortOrder, page, limit } = options;

    const recipes = await queryBuilder(Recipe, {
        filters,
        search,
        searchFields: ['name', 'description'],
        sortBy,
        sortOrder,
        page,
        limit,
        populate: ["categoryId", "cuisineId"]
    })
    return recipes;
}

const updateRecipe = async (id: string, data: Partial<IRecipe>) => {
    const updateRecipe = await Recipe.findByIdAndUpdate(id, data, { new: true });
    return updateRecipe
}

const deleteRecipe = async (id: string) => {
    const deleteRecipe = await Recipe.findByIdAndDelete(id);
    return deleteRecipe
}

export const recipeServices = {
    createRecipe,
    getAllRecipes,
    updateRecipe,
    deleteRecipe
};