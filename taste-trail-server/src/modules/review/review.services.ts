import { Types } from "mongoose";
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

const getApprovedReviewsByRecipeId = async (recipeId: string) => {
    const reviews = await Review.find({ recipeId, status: 'approved' }).populate('userId', 'fullName email profilePhoto').limit(10);
    return reviews;
}

const totalAndAverageReviewsByRecipeId = async (recipeId: string) => {
    const result = await Review.aggregate([
        {
            $match: {
                recipeId: new Types.ObjectId(recipeId),
                status: "approved",
            },
        },
        {
            $group: {
                _id: "$recipeId",
                totalReviews: { $sum: 1 },
                averageRating: { $avg: "$rating" },
            },
        },
    ]);

    return {
        totalReviews: result[0]?.totalReviews || 0,
        averageRating: result[0]?.averageRating
            ? Number(result[0].averageRating.toFixed(1))
            : 0,
    };
};


export const reviewServices = {
    createReview,
    getAllReviews,
    approveReview,
    rejectReview,
    getApprovedReviewsByRecipeId,
    totalAndAverageReviewsByRecipeId
};