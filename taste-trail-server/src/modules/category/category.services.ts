import { Category } from "./category.medel";
import { ICategory } from "./category.type";

const createCategory = async (data: ICategory) => {
    const category = new Category(data);

    return await category.save()
}

const getAllCategories = async (options: Record<string, any>) => {
    const categories = await Category.find();
    return categories;
}

export const categoryServices = {
    createCategory,
    getAllCategories
};