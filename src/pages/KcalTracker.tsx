import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

import WeightLineChart from "../components/WeightLineChart.tsx";
import {NutritionDonutChart} from "../components/NutritionDonutChart.tsx";
import EatenTodayList from "../components/EatenTodayList.tsx";
import AddFoodButton from "../components/AddFoodButton.tsx";

export default function KcalTracker() {
  const [product, setProduct] = useState<searchItem[] | undefined>();

  useEffect(() => {
    fetchSearchAPI("kwark", 1);
    fetchProductAPI("3017620422003");
  }, []);

  interface searchItem {
    id: string;
    product_name: string;
  }
  interface searchReturn {
    count: number;
    page: string;
    page_count: number;
    page_size: number;
    products: searchItem[];
    skip: number;
  }

  async function fetchSearchAPI(product: string, page: number) {
    try {
      const result = await invoke<searchReturn>("get_products", {
        product: product,
        page: page,
      });
      setProduct(result.products);
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function fetchProductAPI(barcode: string) {
    try {
      const result = await invoke("get_product_by_barcode", {
        product: barcode,
      });
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
  <div className="grid grid-cols-2 gap-4 py-4 w-[90%] mx-auto">
      <div className="col-span-2 bg-[#1E1E1E] border border-[#414141] rounded-xl p-6 font-bold flex flex-col items-center">
          <h2 className="border-b-2 border-[#414141] w-full text-center mb-4 text-lg">
              Nutrition charts
          </h2>
          <NutritionDonutChart />
      </div>
      <EatenTodayList />
      <div className="bg-[#1E1E1E] border border-[#414141] rounded-xl p-6 col-span-2 items-center">
        <h2 className="border-b-2 border-[#414141] w-full text-center mb-4 font-bold text-lg">
          Weight
        </h2>
        <WeightLineChart />
      </div>
      <AddFoodButton to="/add-food" />
  </div>
  );
}