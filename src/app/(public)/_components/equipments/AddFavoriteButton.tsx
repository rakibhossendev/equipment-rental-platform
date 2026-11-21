"use client";

import { Button } from "@/components/ui/button";
import { addFavorite } from "@/lib/action/favorite/add-favorite";
import { Heart, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddFavoriteButton = ({equipmentId,}: {equipmentId: string;}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFavorite, setIsFavorite ] = useState(false);

    const handleAddFavorite = async () => {
        if (isLoading || isFavorite) return;

        setIsLoading(true);

        try {
            await addFavorite(equipmentId);
            setIsFavorite(true);
            toast.success("Added to favorites successfully!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to add favorite"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            className="w-full"
            size="lg"
            disabled={isLoading}
            onClick={handleAddFavorite}
        >
            {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
            ) : (
                <Heart
                    className={`size-4 ${isFavorite ? "fill-black text-black" : ""
                        }`}
                />
            )}

            {isLoading
                ? "Adding..."
                : isFavorite
                    ? "Added to Favorites"
                    : "Add to Favorites"}
        </Button>
    );
};

export default AddFavoriteButton;