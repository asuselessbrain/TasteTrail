"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi"
import { revalidateTag } from "next/cache"

export const createReview = async (data: FieldValues) => {
    try {
        const res = await baseApi('/reviews', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        revalidateTag('review', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const getAllReviews = async () => {
    try {
        const res = await baseApi('/reviews', {
            method: 'GET',
            next: {
                tags: ['reviews']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const updateRecipe = async (id: string, data: FieldValues) => {
    try {
        const res = await baseApi(`/recipes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        revalidateTag('recipes', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const deleteRecipe = async (id: string) => {
    try {
        const res = await baseApi(`/recipes/${id}`, {
            method: 'DELETE',
        })
        revalidateTag('recipes', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const getSingleRecipe = async (id: string) => {
    try {
        const res = await baseApi(`/recipes/${id}`, {
            method: 'GET',
            next: {
                tags: ['recipes']
            }
        })
        
        return res
    } catch (error) {
        throw error
    }
}