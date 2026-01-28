import { queryBuilder } from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { Review } from "./review.medel";
import { IReview } from "./review.type";

const createReview = async (email: string, data: IReview) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, 'User not found')
    }

    data.userId = user._id;
    const review = new Review(data);

    return await review.save()
}

const getAllReviews = async (options: Record<string, any>) => {

    const { filters, search, sortBy, sortOrder, page, limit } = options;

    const recipes = await queryBuilder(Review, {
        filters,
        search,
        searchFields: ['name', 'description'],
        sortBy,
        sortOrder,
        page,
        limit,
        populate: [
            {
                path: "userId",
                select: "fullName email",
            },
            {
                path: "recipeId",
                populate: [
                    { path: "categoryId", select: "name" },
                    { path: "cuisineId", select: "name" },
                ],
            },
        ]
    })
    return recipes;
}

const approveReview = async (id: string) => {
    const review = await Review.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    return review;
}

const rejectReview = async (id: string) => {
    const review = await Review.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    return review;
}

// const updateRecipe = async (id: string, data: Partial<IRecipe>) => {
//     const updateRecipe = await Recipe.findByIdAndUpdate(id, data, { new: true });
//     return updateRecipe
// }

// const deleteRecipe = async (id: string) => {
//     const deleteRecipe = await Recipe.findByIdAndDelete(id);
//     return deleteRecipe
// }

// const getSingleRecipe = async (id:string) => {
//     const recipe = await Recipe.findById(id).populate(["categoryId", "cuisineId"]);
//     return recipe;
// }
export const reviewServices = {
    createReview,
    getAllReviews,
    approveReview,
    rejectReview,
    // updateRecipe,
    // deleteRecipe,
    // getSingleRecipe
};