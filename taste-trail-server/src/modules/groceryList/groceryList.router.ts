import { Router } from 'express';
import { groceryListController } from './groceyList.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';

const router = Router();

router.get('/', auth(USER_ROLE.user), groceryListController.generateGroceryList)
router.patch('/purchase', auth(USER_ROLE.user), groceryListController.makeGroceryListPurchased)

export const groceryListRoutes = router;
