import { useState } from "react";
type ProductMetric = {
  label: string;
  value: number;
  unit: string;
  color: string;
};
interface FoodItemProps {
  name: string;
  nutriments: any[];
}

export default function FoodItemComponent({ name, nutriments }: FoodItemProps) {
  const [overlay, setOverlay] = useState<Boolean>(false);

  function handleOverlayClick() {
    setOverlay(!overlay);
  }

  return overlay ? (
    <div className="z-10 bg-gray-600 fixed top-0 right-0 left-0 bottom-0 w-full h-full pt-40 ">
      <div className="fixed inset-0 top-15 bottom-15 bg-[#161818] z-20 overflow-y-auto px-5 py-5 no-scrollbar">
        <div className="w-full max-w-md mx-auto bg-[#1E1E1E] border border-[#414141] rounded-xl p-5">
          <h1 className="text-white text-xl font-bold mb-4">Product Details</h1>

          <div
            key={name}
            className="border-2 rounded-xl p-5 min-h-[92px] flex flex-col items-center justify-center border-[#F67631]"
          >
            <span
              style={{ color: "#F67631", display: "block" }}
              className="font-semibold"
            >
              {name}
            </span>
            <div className="inline-flex items-baseline">
              <span className="text-white text-lg font-bold">
                // prettier-ignore{nutriments.energy - kcal_100g}
              </span>
              <span className="text-[15px] text-white">{nutriments.unit}</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-5 bg-[#1E1E1E] border border-[#414141] rounded-xl p-5">
          <h2 className="text-white text-lg font-bold mb-3">Additional info</h2>
          <p className="text-white text-sm">
            barcode: 0123456789012 <br />
            brand: ExampleBrand <br />
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
            <button className="cursor-pointer mx-auto sticky bottom-2 h-16 justify-center items-center font-bold w-[90%] rounded-full bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] flex z-30">
              Add product
            </button>
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
