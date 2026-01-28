import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { responser } from '../../utils/responser';
import { categoryServices } from './category.services';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;

  const result = await categoryServices.createCategory(category)

  responser(res, {
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const options = req.query

  const result = await categoryServices.getAllCategories(options)


  responser(res, {
    statusCode: 200,
    message: 'Categories retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});


const updateCategory = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await categoryServices.updateCategory(id as string, req.body)


  responser(res, {
    statusCode: 200,
    message: 'Categories updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params
  const result = await categoryServices.deleteCategory(id as string)


  responser(res, {
    statusCode: 200,
    message: 'Categories deleted successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};
