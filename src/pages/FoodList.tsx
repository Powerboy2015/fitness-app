import FoodItemComponent from "../components/FoodItemComponent.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { invoke } from "@tauri-apps/api/core";
import { useState, useMemo, useEffect } from "react";
//pls work github
export default function FoodList() {
  const [product, setProduct] = useState<searchItem[]>([]);

  useEffect(() => {
    fetchSearchAPI("kwark", 1);
    fetchProductAPI("3017620422003");
  }, []);

  interface searchItem {
    id: string;
    product_name: string;
    nutriments: any[];
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
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-30 bg-[#161818] overflow-hidden">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={() => {}}
          placeholderText="food"
        />
      </div>

      <div className="pt-15">
        {product.map((item) => (
          <FoodItemComponent
            key={item.id}
            name={item.product_name}
            nutriments={item.nutriments}
          />
        ))}
      </div>
    </>
  );
}
