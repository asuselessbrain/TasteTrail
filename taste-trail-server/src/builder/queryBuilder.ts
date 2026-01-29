import mongoose, { Model } from "mongoose";

interface QueryOptions {
  filters?: Record<string, any>;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number | string;
  limit?: number | string;
  populate?: any[];
  searchInPopulate?: { path: string; field: string }[];
  populateCollectionNames?: Record<string, string>;
}

export const queryBuilder = async <T>(model: Model<T>, options: QueryOptions) => {
  const {
    filters = {},
    search,
    searchFields = [],
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10,
    populate = [],
    searchInPopulate = [],
    populateCollectionNames = {},
  } = options;

  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;

  const pipeline: any[] = [];

  // ১. ফিল্টার ফিক্স (String ID কে ObjectId তে কনভার্ট করা)
  const matchQuery: any = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key] && mongoose.Types.ObjectId.isValid(filters[key])) {
      matchQuery[key] = new mongoose.Types.ObjectId(filters[key]);
    } else {
      matchQuery[key] = filters[key];
    }
  });
  pipeline.push({ $match: matchQuery });

  // ২. পপুলেশন (Lookup) - এটি সব সময় রান করবে
  if (populate && populate.length > 0) {
    populate.forEach((path) => {
      const collectionName = populateCollectionNames[path];
      if (collectionName) {
        pipeline.push(
          {
            $lookup: {
              from: collectionName,
              localField: path, // e.g. "recipeId" or "recipeId.categoryId"
              foreignField: "_id",
              as: path,
            },
          },
          {
            $unwind: { path: "$" + path, preserveNullAndEmptyArrays: true },
          }
        );
      }
    });
  }

  // ৩. সার্চ লজিক
  if (search) {
    const searchMatch: any = { $or: [] };
    searchFields.forEach((f) => {
      searchMatch.$or.push({ [f]: { $regex: search, $options: "i" } });
    });
    searchInPopulate.forEach((item) => {
      searchMatch.$or.push({
        [`${item.path}.${item.field}`]: { $regex: search, $options: "i" },
      });
    });
    if (searchMatch.$or.length > 0) {
      pipeline.push({ $match: searchMatch });
    }
  }

  // ৪. সর্টিং
  pipeline.push({ $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 } });

  // ৫. পেজিনেশন এবং কাউন্ট
  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await model.aggregate(countPipeline);
  const total = countResult[0]?.total || 0;

  pipeline.push({ $skip: (pageNumber - 1) * limitNumber });
  pipeline.push({ $limit: limitNumber });

  const data = await model.aggregate(pipeline);

  return {
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
    data,
  };
};