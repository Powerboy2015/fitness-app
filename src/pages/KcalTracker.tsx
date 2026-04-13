import WeightLineChart from "../components/WeightLineChart.tsx";

export default function KcalTracker() {
  return (
  <div className="grid grid-cols-2 gap-4 py-4 w-[90%] mx-auto">
      <div className="bg-[#1E1E1E] border border-[#414141] rounded-xl p-6 col-span-2 items-center">
        <h2 className="border-b-2 border-[#414141] w-full text-center mb-4 font-bold text-lg">
          Weight
        </h2>
        <WeightLineChart />
      </div>
  </div>
  );
}
