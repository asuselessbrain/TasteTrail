"use client"
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCuisine } from "@/services/CuisineService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

export const cuisineSchema = z.object({
    name: z.string().min(2, "Cuisine name must be at least 2 characters"),
    description: z.string().optional(),
})

export default function CreateCuisineModal() {
    const form = useForm({
        resolver: zodResolver(cuisineSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onChange"
    })

    const { formState: { isSubmitting } } = form

    const onSubmit = async (data: FieldValues) => {
        const res = await createCuisine(data)

        if (res.success) {
            form.reset()
            toast.success(res.message || "Cuisine created successfully!")
        } else {
            toast.error(res.errorMessage || "Failed to create cuisine.")
        }
    };

    return (
        <DialogContent className="sm:max-w-125">
            <DialogHeader>
                <DialogTitle>Create Cuisine</DialogTitle>
                <DialogDescription>
                    Add a new cuisine to your system.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-2">

                    {/* CATEGORY NAME */}
                    <Controller
                        name="name"
                        control={form.control}
                        rules={{ required: "Category name is required" }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Cuisine Name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g. Italian"
                                    autoComplete="off"
                                />
                                <FieldDescription>
                                    e.g. Italian, Mexican, Indian
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* DESCRIPTION */}
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Description (Optional)</FieldLabel>
                                <textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Short description..."
                                    className="min-h-25 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                />
                                <FieldDescription>
                                    Provide a short description for this cuisine.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button disabled={isSubmitting} className="cursor-pointer disabled:cursor-no-drop" type="submit">{isSubmitting ? "Creating..." : "Create Cuisine"}</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>

    )
}
