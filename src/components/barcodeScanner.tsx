import { invoke } from "@tauri-apps/api/core";
import {
  Format,
  scan,
} from "@tauri-apps/plugin-barcode-scanner";

interface states{
  onProductScan: any
  onLoading: any
  onError: any
  onSearching: any
}

export default function BarcodeScanner({onProductScan, onLoading, onError, onSearching}: states ){

const fetchBarcodeAPI = async (product: string) => {
    if (!product.trim()) {
      onError(null);
      return;
    }
    onLoading(true);
    onError(null);

    try {
      const result = await invoke<any>("get_product_by_barcode", {
        product: product,
      });
      onProductScan(result.product)
      console.log(result.product)

    } catch (err) {
      console.error("Error:", err);

      onError("db error");
    } finally {
      onLoading(false);
    }
  };

  const handleBarcodeSearch = async () => {
  onError(null);
  try {
    const scanned = await scan({
      formats: [Format.EAN13, Format.EAN8,Format.QRCode],
    });
    onSearching(true);
    void fetchBarcodeAPI(scanned.content);
  } catch (err) {
    console.error("Barcode scan failed:", err);
    onError(err)
  }
};

return <div><button onClick={()=>fetchBarcodeAPI("8718796113935")}>barcodeScan</button></div>
}