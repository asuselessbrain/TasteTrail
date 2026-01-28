import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { favoriteController } from './favorite.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), favoriteController.createFavorite);
router.get('/', auth(USER_ROLE.user), favoriteController.getMyFavorites);
router.get('/:recipeId', auth(USER_ROLE.user), favoriteController.getAlreadyFavorite);
router.delete('/:recipeId', auth(USER_ROLE.user), favoriteController.removeFromFavorite);

export const favoriteRoutes = router;