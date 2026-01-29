import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { responser } from '../../utils/responser';
import { recipeServices } from './recipe.services';

const createRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = req.body;

  const result = await recipeServices.createRecipe(recipe)

  responser(res, {
    statusCode: 201,
    message: 'Recipe created successfully',
    data: result,
  });
});

const getAllRecipes = catchAsync(async (req: Request, res: Response) => {
  const options = req.query

  const result = await recipeServices.getAllRecipes(options)

  responser(res, {
    statusCode: 200,
    message: 'Recipes retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});


const updateRecipe = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await recipeServices.updateRecipe(id as string, req.body)

  responser(res, {
    statusCode: 200,
    message: 'Recipes updated successfully',
    data: result,
  });
});

const deleteRecipe = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await recipeServices.deleteRecipe(id as string)

  responser(res, {
    statusCode: 200,
    message: 'Recipes deleted successfully',
    data: result,
  });
});

const getSingleRecipe = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await recipeServices.getSingleRecipe(id as string)

  responser(res, {
    statusCode: 200,
    message: 'Recipes retrieved successfully',
    data: result,
  });
});

const getAllRecipesForMealPlan = catchAsync(async (req: Request, res: Response) => {

  const result = await recipeServices.getAllRecipesForMealPlan()
  responser(res, {
    statusCode: 200,
    message: 'Recipes for meal plan retrieved successfully',
    data: result,
  });
});

export const recipeController = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getSingleRecipe,
  getAllRecipesForMealPlan
};
