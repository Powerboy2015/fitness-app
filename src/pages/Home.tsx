import { useNavigate } from "react-router-dom";
import { NutritionDonutChart } from "../components/NutritionDonutChart";
import WeeklyCaloriesChart from "../components/WeeklyCaloriesChart.tsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="
    fixed inset-0 
    top-15
    bottom-15
    z-20
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
    pb-[env(safe-area-inset-bottom)]
    no-scrollbar
  "
      >
        <div className="grid grid-cols-2 gap-4 py-4 w-[90%] mx-auto">
          <div className="col-span-2 bg-components-color border border-bordercolor rounded-xl p-6 font-bold flex flex-col items-center">
            <h2 className="border-b-2 border-bordercolor w-full text-center mb-4 text-lg text-textcolor">
              Nutrition charts
            </h2>
            <NutritionDonutChart />
          </div>

          <button
            onClick={() => navigate("/history")}
            className="bg-orange-accent hover:bg-buttons-action active:bg-buttons-action rounded-full p-6 font-bold cursor-pointer col-span-2"
          >
            Workout history
          </button>

          <div className="bg-components-color border border-bordercolor rounded-xl p-6 col-span-2 items-center">
            <h2 className="border-b-2 border-bordercolor text-center mb-4 font-bold text-lg text-textcolor">
              Weekly calorie intake
            </h2>
            <WeeklyCaloriesChart />
          </div>
        </div>
      </div>
    </>
  );
}
