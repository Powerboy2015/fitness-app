import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function KcalTracker() {
  const [product, setProduct] = useState<searchItem[] | undefined>();

  useEffect(() => {
    fetchSearchAPI("kwark");
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

  async function fetchSearchAPI(product: string) {
    try {
      const result = await invoke<searchReturn>("get_products", {
        product: product,
        page: 1,
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
    <>
      {product ? (
        product.map((item: searchItem, index: number) => {
          return <div key={index}>{item.product_name}</div>;
        })
      ) : (
        <button
          className="border-gray-700 bg-gray-500"
          onClick={() => fetchSearchAPI("kwark")}
        >
          try again
        </button>
      )}
    </>
  );
}
