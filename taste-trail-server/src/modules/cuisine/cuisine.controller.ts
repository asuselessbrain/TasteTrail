import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { responser } from '../../utils/responser';
import { cuisineServices } from './cuisine.services';

const createCuisine = catchAsync(async (req: Request, res: Response) => {
  const cuisine = req.body;

  const result = await cuisineServices.createCuisine(cuisine)

  responser(res, {
    statusCode: 201,
    message: 'Cuisine created successfully',
    data: result,
  });
});

const getAllCuisines = catchAsync(async (req: Request, res: Response) => {
  const options = req.query

  const result = await cuisineServices.getAllCuisines(options)

  responser(res, {
    statusCode: 200,
    message: 'Cuisines retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});


const updateCuisine = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await cuisineServices.updateCuisine(id as string, req.body)

  responser(res, {
    statusCode: 200,
    message: 'Cuisines updated successfully',
    data: result,
  });
});

const deleteCuisine = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await cuisineServices.deleteCuisine(id as string)


  responser(res, {
    statusCode: 200,
    message: 'Cuisines deleted successfully',
    data: result,
  });
});

export const cuisineController = {
  createCuisine,
  getAllCuisines,
  updateCuisine,
  deleteCuisine
};
