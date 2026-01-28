import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), categoryController.createCategory);
router.get('/', auth(USER_ROLE.admin), categoryController.getAllCategories);
router.patch('/:id', auth(USER_ROLE.admin), categoryController.updateCategory);
router.delete('/:id', auth(USER_ROLE.admin), categoryController.deleteCategory);


export const categoryRoutes = router;
