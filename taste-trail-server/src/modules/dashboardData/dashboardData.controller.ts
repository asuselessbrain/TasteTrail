import { DashboardDataService } from "./dashboardData.service";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { responser } from "../../utils/responser";

const dashboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardDataService.getAdminDashboardData();
  responser(res, {
    statusCode: 200,
    message: "Cooking history retrieved successfully",
    data: result,
  });
});

export const dashboardDataController = {
  dashboardData,
};
