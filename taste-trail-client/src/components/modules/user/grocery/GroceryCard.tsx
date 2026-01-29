"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { markGroceryItemAsPurchased } from "@/services/groceryService";
import { toast } from "sonner";

export default function GroceryCard({item, index}: {item: {name: string; purchased: boolean; _id?: string}, index: number}) {
    const handleTogglePurchased = async () => {
        const res = await markGroceryItemAsPurchased(item.name)
        if(res.success){
            toast.success(res.message || "Grocery item marked as purchased")
        } else{
            toast.error(res.errorMessage || "Failed to mark item as purchased")
        }
    }
  return (
    <div
      key={index}
      className={`p-4 flex items-center gap-4 transition-colors ${
        item.purchased ? "bg-gray-50" : "hover:bg-orange-50"
      }`}
    >
      <Checkbox
        checked={item.purchased}
          onCheckedChange={() => handleTogglePurchased()}
        className="w-5 h-5 cursor-pointer"
      />
      <span
        className={`flex-1 text-lg ${
          item.purchased ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {item.name}
      </span>
      {item.purchased && (
        <span className="text-green-600 font-semibold">✓</span>
      )}
    </div>
  );
}
