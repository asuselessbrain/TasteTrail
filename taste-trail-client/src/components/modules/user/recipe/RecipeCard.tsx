"use client"
import { IRecipe } from "@/types"
import Image from "next/image"
import { Clock, Flame, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RecipeCardProps {
    recipe: IRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    console.log(recipe)
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            {/* Recipe Image */}
            {recipe.image ? (
                <div className="relative h-48 w-full bg-gray-100">
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="h-48 w-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <UtensilsCrossed className="h-12 w-12 text-gray-400" />
                </div>
            )}

            {/* Recipe Info */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div>
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                        {recipe.name}
                    </h3>
                </div>

                {/* Category and Cuisine */}
                <div className="flex gap-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {recipe.categoryId?.name || "N/A"}
                    </span>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {recipe.cuisineId?.name || "N/A"}
                    </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 py-2 border-y border-gray-200">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-700">
                            {recipe.cookingTime} min
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-700">
                            {recipe.calories} kcal
                        </span>
                    </div>
                </div>

                {/* Description */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Ingredients:</p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {recipe.ingredients.slice(0, 2).join(", ")}
                            {recipe.ingredients.length > 2 && `...`}
                        </p>
                    </div>
                )}

                {/* View Button */}
                <Link href={`/user/recipes/${recipe._id}`}>
                    <Button className="w-full">
                        View Recipe
                    </Button>
                </Link>
            </div>
        </div >
    )
}
