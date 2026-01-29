import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { responser } from "../../utils/responser";
import { cookingHistoryServices } from "./cookingHistory.service";

const getAllCookingHistory = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const user = req.user;
  const result = await cookingHistoryServices.getMyCookingHistory(
    user?.email,
    options,
  );
  responser(res, {
    statusCode: 200,
    message: "Cooking history retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const cookingHistoryController = {
  getAllCookingHistory,
};
