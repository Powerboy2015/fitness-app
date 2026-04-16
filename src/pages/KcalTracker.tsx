import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function KcalTracker() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchSearchAPI("kwark");
    fetchProductAPI("3017620422003");
  }, []);

  async function fetchSearchAPI(product: String) {
    try {
      const result = await invoke("get_products", {
        product: product,
        page: 1,
      });

      setProduct(result.products);
      console.log(result.products);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function fetchProductAPI(barcode: String) {
    try {
      const result = await invoke("get_product_by_barcode", {
        product: barcode,
      });
      console.log(result.product);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <>
      {product ? (
        product.map((item, index) => {
          return <div key={index}>{item.product_name}</div>;
        })
      ) : (
        <button
          className="border-gray-700 bg-gray-500"
          onClick={() => fetchAPI()}
        >
          try again
        </button>
      )}
    </>
  );
}
