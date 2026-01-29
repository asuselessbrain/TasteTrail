"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { ICuisine } from "@/types"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { toast } from "sonner"
import { updateCuisine } from "@/services/CuisineService"
import { cuisineSchema } from "./CreateCuisineModal"

export default function UpdateCuisineModal({ cuisine }: { cuisine: ICuisine }) {
    const form = useForm({
        resolver: zodResolver(cuisineSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    const { formState: { isSubmitting } } = form

    useEffect(() => {
        if (cuisine) {
            form.reset({
                name: cuisine.name,
                description: cuisine.description || "",
            })
        }
    }, [cuisine, form])

    const handleUpdate = async (data: FieldValues) => {
        const res = await updateCuisine(cuisine._id, data)

        if (res.success) {
            toast.success(res.message || "Cuisine updated successfully!")
        }
        else {
            toast.error(res.errorMessage || "Failed to update cuisine.")
        }
    }

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Update Cuisine
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Modify cuisine details and click save to update
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6 py-4">
                <div className="space-y-2">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-2">
                                    <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                        Cuisine Name
                                    </FieldLabel>
                                </div>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g. Italian"
                                    autoComplete="off"
                                    value={field.value || ""}
                                    className="bg-gray-50"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                    Description (Optional)
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Short description..."
                                    rows={4}
                                    value={field.value || ""}
                                    className="resize-none"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSubmitting} className="cursor-pointer">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer disabled:cursor-no-drop"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
