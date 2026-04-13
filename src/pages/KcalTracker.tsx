import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

export default function KcalTracker() {
  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    try {
      const result = await invoke("get_products");
      console.log("Products:", result);
    } catch (err) {
      console.error("Error:", err);
    }

    return <>test</>;
  }
}
