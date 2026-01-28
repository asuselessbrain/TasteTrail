import { Model } from "mongoose";

interface QueryOptions {
    filters?: Record<string, any>;
    search?: string;
    searchFields?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export const queryBuilder = async <T>(model: Model<T>, options: QueryOptions) => {
    const { filters = {}, search, searchFields = [], sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10 } = options

    let query = { ...filters }

    if (search && searchFields.length > 0) {
        query.$or = searchFields.map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    }

    const total = await model.countDocuments(query)

    const result = await model.find(query).sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }).skip((page - 1) * limit).limit(limit)

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