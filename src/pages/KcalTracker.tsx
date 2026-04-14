import WeightLineChart from "../components/WeightLineChart.tsx";
import {NutritionDonutChart} from "../components/NutritionDonutChart.tsx";
import EatenTodayList from "../components/EatenTodayList.tsx";
import AddFoodButton from "../components/AddFoodButton.tsx";

export default function KcalTracker() {
  return (
  <div className="grid grid-cols-2 gap-4 py-4 w-[90%] mx-auto">
      <div className="col-span-2 bg-components-color border border-bordercolor rounded-xl p-6 font-bold flex flex-col items-center">
          <h2 className="border-b-2 border-bordercolor w-full text-center mb-4 text-lg text-textcolor">
              Nutrition charts
          </h2>
          <NutritionDonutChart />
      </div>
      <EatenTodayList />
      <div className="bg-components-color border border-bordercolor rounded-xl p-6 col-span-2 items-center">
        <h2 className="border-b-2 border-bordercolor w-full text-center mb-4 font-bold text-lg text-textcolor">
          Weight
        </h2>
        <WeightLineChart />
      </div>
      <AddFoodButton to="/add-food" />
  </div>
  );
}