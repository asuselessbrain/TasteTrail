"use client";
import { Button } from "@/components/ui/button";
import { createFavorite, removeFromFavorite } from "@/services/favoriteService";
import { toast } from "sonner";

export default function FavoriteAction({
  recipeId,
  isAddedInFavorite,
}: {
  recipeId: string;
  isAddedInFavorite: boolean;
}) {
  const addToFavorites = async () => {
    const res = await createFavorite(recipeId);

    if (res.success) {
      toast.success(res.message || "Added to favorites!");
    }
    if (!res.success) {
      toast.error(res.errorMessage || "Failed to add to favorites.");
    }
  };

  const removeFromFavorites = async () => {
    const res = await removeFromFavorite(recipeId);

    if (res.success) {
      toast.success(res.message || "Added to favorites!");
    }
    if (!res.success) {
      toast.error(res.errorMessage || "Failed to add to favorites.");
    }
  };
  return (
    <>
      {isAddedInFavorite ? (
        <Button
          onClick={removeFromFavorites}
          className="w-full font-bold py-3 rounded-lg transition-colors"
        >
          Remove from Favorites
        </Button>
      ) : (
        <Button
          onClick={addToFavorites}
          className="w-full font-bold py-3 rounded-lg transition-colors"
        >
          Add to Favorites
        </Button>
      )}
    </>
  );
}
