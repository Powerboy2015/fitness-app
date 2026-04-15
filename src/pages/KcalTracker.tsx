import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function KcalTracker() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchAPI();
  }, []);
  let count = 0;
  async function fetchAPI() {
    try {
      const result = await invoke("get_products", {
        product: "kwark",
        page: 1,
      });

      setProduct(result.products);
      console.log(result.products);
    } catch (err) {
      console.error("Error:", err);

      if (count < 6) {
        count++;
        fetchAPI();
      }
    }
  }
  return (
    <>
      {product
        ? product.map((item, index) => {
            return <div>{item.product_name}</div>;
          })
        : null}
    </>
  );
}
