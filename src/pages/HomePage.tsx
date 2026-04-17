import WeeklyCaloriesChart from "../components/charts/WeeklyCaloriesChart.tsx";
import {NutritionDonutChart} from "../components/charts/NutritionDonutChart.tsx";
import LinkButton from "../components/ui/LinkButton.tsx";
import {ROUTES} from "../router/routes.ts";

export default function HomePage() {
  return (
    <>
      <div className="bg-background grid grid-cols-2 gap-4 mx-auto" >
          <WidgetComponent title={"Nutrition Charts"}>
            <NutritionDonutChart/>
          </WidgetComponent>

          <LinkButton to={ROUTES.WOKROUT_HISTORY}>workout History</LinkButton>

          <WidgetComponent title={"Weekly Calorie Intake"}>
            <WeeklyCaloriesChart/>
          </WidgetComponent>
      </div>
    </>
  );
}

interface widgetProps{
  children: React.ReactElement
  title: string
}
function WidgetComponent({children,title}: widgetProps): React.ReactElement {
  return <>
    <div className="bg-components border border-bordercolor rounded-xl p-6 col-span-2 items-center">
      <h2 className="border-b-2 border-[#414141] text-center mb-4 font-bold text-lg">{title}</h2>
      {children}
    </div>
  </>

}