"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi"
import { revalidateTag } from "next/cache"

export const createCategory = async (data: FieldValues) => {
    try {
        const res = await baseApi('/categories', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        revalidateTag('categories', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const getAllCategories = async () => {
    try {
        const res = await baseApi('/categories', {
            method: 'GET',
            next: {
                tags: ['categories']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const updateCategory = async (id: string, data: FieldValues) => {
    try {
        const res = await baseApi(`/categories/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        revalidateTag('categories', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const deleteCategory = async (id: string) => {
    try {
        const res = await baseApi(`/categories/${id}`, {
            method: 'DELETE',
        })
        revalidateTag('categories', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const getAllCategoriesForFiltering = async () => {
    try {
        const res = await baseApi('/categories/for-filtering', {
            method: 'GET',
            next: {
                tags: ['categories']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}