import { FieldValues } from "react-hook-form"

export const signUp = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
    } catch (error) {
        throw error
    }
}

export const signIn = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
            method: "GET",
            credentials: "include",
        })

        const result = await res.json()
        return result
    } catch (error) {
        throw error
    }
}