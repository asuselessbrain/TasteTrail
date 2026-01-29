"use client"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IRecipe } from "@/types"
import Image from "next/image"

interface ViewRecipeModalProps {
    recipe: IRecipe
}

export default function ViewRecipeModal({ recipe }: ViewRecipeModalProps) {
    return (
        <DialogContent className="sm:max-w-5xl max-h-9/10 overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    {recipe.name}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Recipe details and information
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
                {recipe.image && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Category</p>
                        <p className="text-gray-900">{recipe.categoryId?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Cuisine</p>
                        <p className="text-gray-900">{recipe.cuisineId?.name || "N/A"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Cooking Time</p>
                        <p className="text-gray-900">{recipe.cookingTime} minutes</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Calories</p>
                        <p className="text-gray-900">{recipe.calories} kcal</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-gray-700">
                                    {ingredient}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No ingredients available</p>
                        )}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {recipe.instructions || "No instructions available"}
                    </p>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-xs font-semibold text-gray-500 mb-1">CREATED AT</p>
                    <p className="text-gray-600">{new Date(recipe.createdAt).toLocaleDateString()} at {new Date(recipe.createdAt).toLocaleTimeString()}</p>
                </div>
            </div>
        </DialogContent>
    )
}
