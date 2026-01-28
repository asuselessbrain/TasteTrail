"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateRecipe } from "@/services/recipeService"
import { IRecipe, ICategory, ICuisine } from "@/types"
import { createRecipeSchema } from "./CreateRecipeModal"
import { getAllCategoriesForFiltering } from "@/services/categoryService"
import { getAllCuisinesForFiltering } from "@/services/CuisineService"

interface UpdateRecipeModalProps {
    recipe: IRecipe
}

export default function UpdateRecipeModal({ recipe }: UpdateRecipeModalProps) {
    const form = useForm({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            name: "",
            ingredients: "",
            instructions: "",
            categoryId: "",
            cuisineId: "",
            cookingTime: 0,
            calories: 0,
            image: undefined,
        },
    })

    const [categories, setCategories] = useState<ICategory[]>([])
    const [cuisines, setCuisines] = useState<ICuisine[]>([])

    const { formState: { isSubmitting } } = form

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategoriesForFiltering()
            setCategories(res.data)
        }
        fetchCategories()

        const fetchCuisines = async () => {
            const res = await getAllCuisinesForFiltering()
            setCuisines(res.data)
        }
        fetchCuisines()
    }, [])

    useEffect(() => {
        if (recipe) {
            form.reset({
                name: recipe.name,
                ingredients: recipe.ingredients.join(", "),
                instructions: recipe.instructions,
                categoryId: recipe.categoryId._id,
                cuisineId: recipe.cuisineId._id,
                cookingTime: recipe.cookingTime,
                calories: recipe.calories,
                image: undefined,
            })
        }
    }, [recipe, form])

    const handleUpdate = async (data: FieldValues) => {
        // If image is updated, handle Cloudinary upload
        if (data.image instanceof File) {
            const formData = new FormData()
            formData.append("file", data.image)
            formData.append("upload_preset", "my_preset")

            const res = await fetch("https://api.cloudinary.com/v1_1/dwduymu1l/image/upload", { method: "POST", body: formData })
            const result = await res.json()
            data.image = result.secure_url
        }

        // Convert ingredients string to array
        if (typeof data.ingredients === "string") {
            data.ingredients = data.ingredients.split(",").map((i: string) => i.trim()).filter(Boolean)
        }

        // Update recipe
        const res = await updateRecipe(recipe._id, data)

        if (res.success) {
            toast.success(res.message || "Recipe updated successfully!")
            form.reset(data)
        } else {
            toast.error(res.errorMessage || "Failed to update recipe.")
        }
    }

    return (
        <DialogContent className="sm:max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Update Recipe
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Modify recipe details and click save to update
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6 py-4">

                {/* Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Recipe Name</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="e.g. Chocolate Cake"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Ingredients */}
                <Controller
                    name="ingredients"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Ingredients (comma separated)</FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                placeholder="flour, sugar, chocolate, butter"
                                value={Array.isArray(field.value) ? field.value.join(", ") : typeof field.value === "string" ? field.value : ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                rows={4}
                            />
                            <FieldDescription>Write ingredients separated by commas.</FieldDescription>
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Instructions */}
                <Controller
                    name="instructions"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Instructions</FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                placeholder="Describe the cooking process..."
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                rows={6}
                            />
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <Controller
                        name="categoryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                <select
                                    {...field}
                                    id={field.name}
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* Cuisine */}
                    <Controller
                        name="cuisineId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Cuisine</FieldLabel>
                                <select
                                    {...field}
                                    id={field.name}
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">Select cuisine</option>
                                    {cuisines.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* Cooking Time & Calories */}
                    <Controller
                        name="cookingTime"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Cooking Time (min)</FieldLabel>
                                <Input
                                    {...field}
                                    type="number"
                                    id={field.name}
                                    value={typeof field.value === "number" ? field.value : ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    placeholder="30"
                                />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="calories"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Calories (kcal)</FieldLabel>
                                <Input
                                    {...field}
                                    type="number"
                                    id={field.name}
                                    value={typeof field.value === "number" ? field.value : ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    placeholder="450"
                                />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                {/* Image */}
                <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Recipe Image</FieldLabel>
                            <Input
                                type="file"
                                id={field.name}
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
