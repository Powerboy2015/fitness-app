import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function KcalTracker() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    try {
      const result = await invoke("get_products", {
        product: "kwark",
        page: 1,
      });
      setProduct(JSON.parse(result).entries);
      console.log(JSON.parse(result).entries);
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return (
    <>
      {product
        ? product.map((item, index) => {
            return <div>{item.descForUi.replace(/<[^>]*>/g, "")}</div>;
          })
        : null}
    </>
  );
}
