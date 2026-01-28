import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { responser } from '../../utils/responser';
import { reviewServices } from './review.services';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const review = req.body;

  const result = await reviewServices.createReview(user?.email as string, review);

  responser(res, {
    statusCode: 201,
    message: 'Review submitted successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const options = req.query

  const result = await reviewServices.getAllReviews(options)

  responser(res, {
    statusCode: 200,
    message: 'Reviews retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const approveReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.approveReview(id as string);

  responser(res, {
    statusCode: 200,
    message: 'Review approved successfully',
    data: result,
  });
});

const rejectReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.rejectReview(id as string);
  responser(res, {
    statusCode: 200,
    message: 'Review rejected successfully',
    data: result,
  });
});

const getApprovedReviewsByRecipeId = catchAsync(async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  const result = await reviewServices.getApprovedReviewsByRecipeId(recipeId as string);
  responser(res, {
    statusCode: 200,
    message: 'Approved reviews retrieved successfully',
    data: result,
  });
});

const totalAndAverageReviewsByRecipeId = catchAsync(async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  const result = await reviewServices.totalAndAverageReviewsByRecipeId(recipeId as string);
  responser(res, {
    statusCode: 200,
    message: 'Total and average reviews retrieved successfully',
    data: result,
  });
});


export const reviewController = {
  createReview,
  getAllReviews,
  approveReview,
  rejectReview,
  getApprovedReviewsByRecipeId,
  totalAndAverageReviewsByRecipeId
};
