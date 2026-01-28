import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.contant';
import { reviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createReviewSchema } from './review.validation';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), validateRequest(createReviewSchema), reviewController.createReview);
router.get('/', auth(USER_ROLE.admin), reviewController.getAllReviews);
router.patch('/approve/:id', auth(USER_ROLE.admin), reviewController.approveReview);
router.patch('/reject/:id', auth(USER_ROLE.admin), reviewController.rejectReview);
// router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), reviewController.getSingleReview);
// router.patch('/:id', auth(USER_ROLE.admin), reviewController.updateReview);
// router.delete('/:id', auth(USER_ROLE.admin), reviewController.deleteReview);

export const reviewRoutes = router;