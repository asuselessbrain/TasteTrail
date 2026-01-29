import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { responser } from "../../utils/responser";
import { groceryListServices } from "./groceryList.serveice";

const generateGroceryList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await groceryListServices.generateGroceryList(user?.email);
  responser(res, {
    statusCode: 200,
    message: "Grocery list generated successfully",
    data: result,
  });
});

const makeGroceryListPurchased = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ingredientName } = req.body;
    const result = await groceryListServices.makeGroceryListPurchased(
      user?.email as string,
      ingredientName,
    );
    responser(res, {
      statusCode: 200,
      message: "Grocery item marked as purchased successfully",
      data: result,
    });
  },
);

const generateGroceryListPDF = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const pdfDoc = await groceryListServices.generateGroceryListPDF(
      user?.email,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=grocery-list.pdf",
    );
    pdfDoc.pipe(res);
    pdfDoc.end();
  },
);

export const groceryListController = {
  generateGroceryList,
  makeGroceryListPurchased,
  generateGroceryListPDF,
};
