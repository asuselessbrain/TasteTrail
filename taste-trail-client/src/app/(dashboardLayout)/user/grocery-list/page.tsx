import { Button } from "@/components/ui/button";
import Link from "next/link";
import GroceryCard from "@/components/modules/user/grocery/GroceryCard";
import { generateGroceryList } from "@/services/groceryService";

interface GroceryItem {
  name: string;
  purchased: boolean;
  _id?: string;
}

export default async function GenerateGroceryListPage() {
  const res = await generateGroceryList();
  const groceryList = res.data.items || [];

  const groceryListCount = groceryList.length;
  const purchasedCount = groceryList.filter(
    (item: GroceryItem) => item.purchased,
  ).length;
  const remainingCount = groceryListCount - purchasedCount;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-360 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🛒 Grocery List
          </h1>
          <p className="text-lg text-gray-600">
            Items needed for your meal plan
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mt-4 rounded-full"></div>
        </div>

        {/* Empty State */}
        {!groceryList || groceryList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-500 mb-6">
              No grocery items for your current meal plan
            </p>
            <Link href="/user/meal-planner">
              <Button>Create Meal Plan</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-orange-600">
                  {groceryListCount}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600">Purchased</p>
                <p className="text-3xl font-bold text-green-600">
                  {purchasedCount}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-3xl font-bold text-amber-600">
                  {remainingCount}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  Shopping Progress
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round((purchasedCount / groceryList.length) * 100)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
                  style={{
                    width: `${(purchasedCount / groceryList.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex gap-3 mb-8">
              <Button
                // onClick={handleSelectAll}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                {groceryList.every((item) => item.purchased)
                  ? "Deselect All"
                  : "Select All"}
              </Button>
              {purchasedCount > 0 && (
                <Button
                  onClick={handleClearPurchased}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  Clear Purchased
                </Button>
              )}
            </div> */}

            {/* Grocery List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                {groceryList.map((item:GroceryItem, index: number) => (
                  <GroceryCard key={index} item={item} index={index} />
                ))}
              </div>
            </div>

            {/* Completion Message */}
            {/* {purchasedCount === groceryList.length &&
              groceryList.length > 0 && (
                <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded">
                  <p className="text-green-700 text-lg font-semibold">
                    🎉 Great! You&apos;ve purchased all items on your list!
                  </p>
                </div>
              )} */}
          </>
        )}
      </div>
    </div>
  );
}
