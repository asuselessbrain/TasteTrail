import { queryBuilder } from "../../builder/queryBuilder";
import { Category } from "./category.medel";
import { ICategory } from "./category.type";

const createCategory = async (data: ICategory) => {
    const category = new Category(data);

    return await category.save()
}

const getAllCategories = async (options: Record<string, any>) => {

    const { filters, search, sortBy, sortOrder, page, limit } = options;

    const categories = await queryBuilder(Category, {
        filters,
        search,
        searchFields: ['name', 'description'],
        sortBy,
        sortOrder,
        page,
        limit
    })
    return categories;
}

const updateCategory = async (id: string, data: Partial<ICategory>) => {
    const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true });

    return updateCategory
}

export const categoryServices = {
    createCategory,
    getAllCategories,
    updateCategory
};