import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function KcalTracker() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    try {
      const result = await invoke("get_products", { product: "chocolade" });
      setProduct(result.products);
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return (
    <>
      <div onClick={() => console.log(product)}>test</div>
      {product
        ? product.map((item, index) => {
            return <img key={index} src={item.image_front_small_url} alt="" />;
          })
        : null}
    </>
  );
}
