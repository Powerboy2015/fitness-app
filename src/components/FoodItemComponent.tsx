import { useState } from "react";

interface Nutriments {
  "energy-kcal_100g"?: number;
  "carbohydrates_100g"?: number;
  "proteins_100g"?: number;
  "fat_100g"?: number;
  "sugars_100g"?: number;
  "fiber_100g"?: number;
  "sodium_100g"?: number;
}

interface FoodItemProps {
  name: string;
  nutriments: Nutriments;
  barcode: string
  brand: string
}

export default function FoodItemComponent({ name, nutriments, barcode, brand }: FoodItemProps) {
  const [overlay, setOverlay] = useState<Boolean>(false);

  function handleOverlayClick() {
    setOverlay(!overlay);
  }
  const calories = nutriments["energy-kcal_100g"] ?? 0;
  const carbs = nutriments["carbohydrates_100g"] ?? 0
  const protein = nutriments["proteins_100g"] ?? 0;
  const fat = nutriments["fat_100g"] ?? 0;
  const sugar = nutriments["sugars_100g"] ?? 0;
  const fiber = nutriments["fiber_100g"] ?? 0;
  const sodium = nutriments["sodium_100g"] ?? 0;

  return overlay ? (
    <div className="z-10 bg-gray-600 fixed top-0 right-0 left-0 bottom-0 w-full h-full pt-40 mt-10 ">
      <div className="fixed inset-0 top-15 bottom-15 bg-[#161818] z-20 overflow-y-auto px-5 py-5 no-scrollbar">
        <div className="w-full max-w-md mx-auto bg-[#1E1E1E] border border-[#414141] rounded-xl p-5">
          <h1 className="text-white text-xl font-bold mb-4">Product Details per 100g</h1>

          <div className="grid grid-cols-3 gap-3 ">

            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#F67631] col-span-3">
              <div className="font-semibold block text-[#F67631]">
                Calories
              </div>
              <div className="inline-flex items-baseline">
                {calories.toFixed()}
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#DC143C]">
              <div className="font-semibold block text-[#DC143C]">
                Carbs
              </div>
              <div className="inline-flex items-baseline">
                {carbs.toFixed(1)}g
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#4DA3FF]">
              <div className="font-semibold block text-[#4DA3FF]">
                Proteins
              </div>
              <div className="inline-flex items-baseline">
                {protein.toFixed(1)}g
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#32CD32]">
              <div className="font-semibold block text-[#32CD32]">
                Fats
              </div>
              <div className="inline-flex items-baseline">
                {fat.toFixed(1)}g
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#FFD700]">
              <div className="font-semibold block text-[#FFD700]">
                Sugar
              </div>
              <div className="inline-flex items-baseline">
                {sugar.toFixed(1)}g
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#9153cc]">
              <div className="font-semibold block text-[#9153cc]">
                Fiber
              </div>
              <div className="inline-flex items-baseline">
                {fiber.toFixed(1)}g
              </div>
            </div>
            <div className="border-2 rounded-xl p-5  flex flex-col items-center justify-center border-[#FF4500]">
              <div className="font-semibold block text-[#FF4500]">
                Sodium
              </div>
              <div className="inline-flex items-baseline">
                {sodium.toFixed(1)}g
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-5 bg-[#1E1E1E] border border-[#414141] rounded-xl p-5">
          <h2 className="text-white text-lg font-bold mb-3">Additional info</h2>
          <p className="text-white text-sm">
            barcode: {barcode} <br />
            brand: {brand} <br />
          </p>
        </div>
        <div>
          <div className="w-full max-w-md mx-auto mt-5 bg-[#1E1E1E] border border-[#414141] rounded-xl p-5">
            <h2 className="text-white text-lg font-bold mb-3">
              Daily progression
            </h2>
            <input
              type="text"
              placeholder="0"
              className="bg-[#1E1E1E] text-white placeholder:text-gray-500 border border-[#414141] rounded-xl p-2 w-25 focus:outline-none focus:ring-2 focus:ring-[#F67631]"
            />
            <select
              defaultValue="gr"
              className="bg-[#1E1E1E] text-white border border-[#414141] rounded-xl p-2 w-32 focus:outline-none focus:ring-2 focus:ring-[#F67631] ml-3"
            >
              <option value="kg">kg</option>
              <option value="gr">gr</option>
              <option value="mg">mg</option>
            </select>
          </div>
          <div className="w-full max-w-md mx-auto mt-5">
            <div className=" flex">
              <button onClick={() => { setOverlay(false) }} className="cursor-pointer mx-auto sticky bottom-2 h-16 justify-center items-center font-bold w-[90%] rounded-full bg-[#5c5c5c] hover:bg-[#9b9b9b] active:bg-[#949494] flex z-30">
                Cancel
              </button>
              <button className="cursor-pointer mx-auto sticky bottom-2 h-16 justify-center items-center font-bold w-[90%] rounded-full bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] flex z-30">
                Add product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="bg-[#252525] border-[#414141] border rounded-xl px-2 mb-3 flex w-[90%] items-center mx-auto hover:bg-[#252525] active:bg-[#252525] cursor-pointer"
      onClick={() => handleOverlayClick()}
    >
      <div className="pl-3 p-6">
        <div className="flex-1 text-xl text-left cursor-pointer mb-auto">
          {name}
        </div>
      </div>
    </div>
  );
}
