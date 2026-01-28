import { Category } from "./category.medel";
import { ICategory } from "./category.type";

const createCategory = async (data: ICategory) => {
    const category = new Category(data);

    return await category.save()
}

export const categoryServices = {
    createCategory,
};