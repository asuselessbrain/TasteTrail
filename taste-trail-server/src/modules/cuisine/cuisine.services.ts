import { queryBuilder } from "../../builder/queryBuilder";
import { Cuisine } from "./cuisine.medel";
import { ICuisine } from "./cuisine.type";

const createCuisine = async (data: ICuisine) => {
    const cuisine = new Cuisine(data);

    return await cuisine.save()
}

const getAllCuisines = async (options: Record<string, any>) => {

    const { filters, search, sortBy, sortOrder, page, limit } = options;

    const cuisines = await queryBuilder(Cuisine, {
        filters,
        search,
        searchFields: ['name', 'description'],
        sortBy,
        sortOrder,
        page,
        limit
    })
    return cuisines;
}

const updateCuisine = async (id: string, data: Partial<ICuisine>) => {
    const updateCuisine = await Cuisine.findByIdAndUpdate(id, data, { new: true });
    return updateCuisine
}

const deleteCuisine = async (id: string) => {
    const deleteCuisine = await Cuisine.findByIdAndDelete(id);
    return deleteCuisine
}

const getAllCuisinesForFiltering = async () => {
    const cuisines = await Cuisine.find()
    return cuisines;
}

export const cuisineServices = {
    createCuisine,
    getAllCuisines,
    updateCuisine,
    deleteCuisine,
    getAllCuisinesForFiltering
};