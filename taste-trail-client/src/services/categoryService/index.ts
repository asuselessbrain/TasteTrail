"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi"

export const createCategory = async (data: FieldValues) => {
    try {
        const res = await baseApi('/categories', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return res
    } catch (error) {
        throw error
    }
}
