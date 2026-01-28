import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { cuisineController } from './cuisine.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), cuisineController.createCuisine);
router.get('/', auth(USER_ROLE.admin), cuisineController.getAllCuisines);
router.get('/for-filtering', auth(USER_ROLE.admin, USER_ROLE.user), cuisineController.getAllCuisinesForFiltering);
router.patch('/:id', auth(USER_ROLE.admin), cuisineController.updateCuisine);
router.delete('/:id', auth(USER_ROLE.admin), cuisineController.deleteCuisine);

export const cuisineRoutes = router;
