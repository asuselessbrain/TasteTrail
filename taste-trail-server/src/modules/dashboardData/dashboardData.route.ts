import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { dashboardDataController } from './dashboardData.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), dashboardDataController.dashboardData)


export const dashboardDataRoutes = router;
