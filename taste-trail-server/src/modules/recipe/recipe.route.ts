import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { recipeController } from './recipe.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), recipeController.createRecipe);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), recipeController.getAllRecipes);
router.get('/recommended', auth(USER_ROLE.admin, USER_ROLE.user), recipeController.recommendedRecipes);
router.get('/all-recipes-for-meal-plan', auth(USER_ROLE.admin, USER_ROLE.user), recipeController.getAllRecipesForMealPlan);
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), recipeController.getSingleRecipe);
router.patch('/:id', auth(USER_ROLE.admin), recipeController.updateRecipe);
router.delete('/:id', auth(USER_ROLE.admin), recipeController.deleteRecipe);

export const recipeRoutes = router;