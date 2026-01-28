import { Model, PopulateOptions, Query } from "mongoose";

interface QueryOptions {
    filters?: Record<string, any>;
    search?: string;
    searchFields?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    populate?: string | PopulateOptions | (string | PopulateOptions)[];
}

export const queryBuilder = async <T>(model: Model<T>, options: QueryOptions) => {
    const { filters = {}, search, searchFields = [], sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10, populate } = options

    let query = { ...filters }

    if (search && searchFields.length > 0) {
        query.$or = searchFields.map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    }

    const total = await model.countDocuments(query)

    let mongoQuery: Query<T[], T> = model
        .find(query)
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    if (populate) {
        const populateOption = Array.isArray(populate) ? populate : [populate];
        mongoQuery = mongoQuery.populate(populateOption);
    }

    const result = await mongoQuery

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
        data: result
    }
}