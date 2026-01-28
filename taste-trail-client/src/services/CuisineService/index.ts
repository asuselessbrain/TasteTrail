"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi"
import { revalidateTag } from "next/cache"

export const createCuisine = async (data: FieldValues) => {
    try {
        const res = await baseApi('/cuisines', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        revalidateTag('cuisines', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const getAllCuisines = async () => {
    try {
        const res = await baseApi('/cuisines', {
            method: 'GET',
            next: {
                tags: ['cuisines']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const updateCuisine = async (id: string, data: FieldValues) => {
    try {
        const res = await baseApi(`/cuisines/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        revalidateTag('cuisines', 'max')
        return res
    } catch (error) {
        throw error
    }
}

export const deleteCuisine = async (id: string) => {
    try {
        const res = await baseApi(`/cuisines/${id}`, {
            method: 'DELETE',
        })
        revalidateTag('cuisines', 'max')
        return res
    } catch (error) {
        throw error
    }
}