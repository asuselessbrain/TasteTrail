"use client"
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getAllCategoriesForFiltering } from "@/services/categoryService";
import { getAllCuisinesForFiltering } from "@/services/CuisineService";
import { createRecipe } from "@/services/recipeService";
import { ICategory, ICuisine } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

export const createRecipeSchema = z.object({
    name: z
        .string()
        .min(1, "Recipe name is required")
        .max(100, "Recipe name must be under 100 characters"),

    ingredients: z.preprocess((val) => {
        if (typeof val === "string") {
            return val.split(",").map((i) => i.trim()).filter(Boolean);
        }
        return val;
    }, z.array(z.string().min(1, "Ingredient cannot be empty")).nonempty("At least one ingredient is required")),

    instructions: z
        .string()
        .min(1, "Instructions are required")
        .max(5000, "Instructions are too long"),

    categoryId: z
        .string()
        .min(1, "Category is required"),

    cuisineId: z
        .string()
        .min(1, "Cuisine is required"),

    cookingTime: z.preprocess((val) => {
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, z.number().positive("Cooking time must be positive")),

    calories: z.preprocess((val) => {
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, z.number().positive("Calories must be positive")),

    image: z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
            message: "Only image files allowed",
        })
        .optional(),
});

export default function CreateRecipeModal() {
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
        mode: "onChange"
    })

    const [categories, setCategories] = useState([])
    const [cuisines, setCuisines] = useState([])

    const { formState: { isSubmitting } } = form

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategoriesForFiltering()
            setCategories(categories.data)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchCuisines = async () => {
            const cuisines = await getAllCuisinesForFiltering()
            setCuisines(cuisines.data)
        }
        fetchCuisines()
    }, [])

    const onSubmit = async (data: FieldValues) => {
        if (data.image) {
            const formData = new FormData()
            formData.append("file", data.image)
            formData.append("upload_preset", "my_preset");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dwduymu1l/image/upload",
                { method: "POST", body: formData }
            )
            const result = await res.json()
            data.image = result.secure_url
        }
        const res = await createRecipe(data)

        if (res.success) {
            form.reset()
            toast.success(res.message || "Recipe created successfully!")
        } else {
            toast.error(res.errorMessage || "Failed to create recipe.")
        }
    };

    return (
        <DialogContent className="sm:max-w-2xl overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Create Recipe</DialogTitle>
                <DialogDescription>Add a new recipe to your system.</DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-2 mb-4">

                    {/* NAME */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Name</FieldLabel>
                                <Input {...field} placeholder="e.g. Chicken Curry" />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* INGREDIENTS TEXTAREA */}
                    <Controller
                        name="ingredients"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Ingredients (comma separated)</FieldLabel>
                                <textarea
                                    {...field}
                                    value={
                                        Array.isArray(field.value)
                                            ? field.value.join(", ")
                                            : typeof field.value === "string"
                                                ? field.value
                                                : ""
                                    }
                                    placeholder="salt, oil, chicken, garlic"
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <FieldDescription>Write ingredients separated by commas.</FieldDescription>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* INSTRUCTIONS */}
                    <Controller
                        name="instructions"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Instructions</FieldLabel>
                                <textarea
                                    {...field}
                                    placeholder="Describe the cooking process..."
                                    className="min-h-20 w-full rounded-md border px-3 py-2 text-sm"
                                />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CATEGORY SELECT */}
                        <Controller
                            name="categoryId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Category</FieldLabel>
                                    <select
                                        {...field}
                                        className="rounded-md border px-3 py-2 text-sm"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((c: ICategory) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />


                        {/* CUISINE SELECT */}
                        <Controller
                            name="cuisineId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Cuisine</FieldLabel>
                                    <select
                                        {...field}
                                        className="rounded-md border px-3 py-2 text-sm"
                                    >
                                        <option value="">Select cuisine</option>
                                        {cuisines.map((c: ICuisine) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* COOKING TIME */}
                        <Controller
                            name="cookingTime"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Cooking Time (min)</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        value={typeof field.value === "number" ? field.value : ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                                    <FieldLabel>Calories (kcal)</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="450"
                                        value={typeof field.value === "number" ? field.value : ""}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />


                    </div>
                    {/* IMAGE */}
                    <Controller
                        name="image"
                        control={form.control}
                        defaultValue={undefined}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Profile Photo</FieldLabel>
                                <Input
                                    type="file"
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    onChange={(e) => field.onChange(e.target.files?.[0])} // pass File object
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting ? "Creating..." : "Create Recipe"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>

    )
}
