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

const deleteCategory = async (id: string) => {
    const deleteCategory = await Category.findByIdAndDelete(id);
    return deleteCategory
}

const getAllCategoriesForFiltering = async() => {
    const categories = await Category.find()
    return categories;
}

export const categoryServices = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getAllCategoriesForFiltering
};