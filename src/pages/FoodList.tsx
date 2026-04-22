import FoodItemComponent from "../components/FoodItemComponent.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import {
  Format,
  scan,
} from "@tauri-apps/plugin-barcode-scanner";

interface Nutriments {
  "energy-kcal_100g"?: number;
  "carbohydrates_100g"?: number;
  "proteins_100g"?: number;
  "fat_100g"?: number;
  "sugars_100g"?: number;
  "fiber_100g"?: number;
  "sodium_100g"?: number;
}

interface searchItem {
  id: string;
  product_name: string;
  nutriments: Nutriments;
  code: string;
  brands: string;
}
interface searchReturn {
  page: string;
  page_count: number;
  page_size: number;
  products: searchItem[];
  product: searchItem[];
  skip: number;
}
//pls work github

export default function FoodList() {
  const [product, setProduct] = useState<searchItem[]>([]);
  const [productBarcode, setProductBarcode] = useState<searchItem | null>(null)
  const [searchText, setSearchText] = useState("");
  const [rememberText, setRememberText] = useState("");
  const [recents, setRecents] = useState<searchItem[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("nothing");
  const [Searching, setSearching] = useState(false);


  const fetchSearchAPI = async (product: string, page: number) => {
    if (!product.trim()) {
      setProduct([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await invoke<searchReturn>("get_products", {
        product: product,
        page: page,
      });
      setProduct(result.products ?? []);
      console.log(result);

    } catch (err) {
      console.error("Error:", err);

      setError("WE GAAN ALLEMAAL DOOD!! ER WERKT IETS NIET AAN DE DATABASE!!!");
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };


  const fetchBarcodeAPI = async (product: string) => {
    if (!product.trim()) {
      setProduct([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setProduct([])

    try {
      const result = await invoke<any>("get_product_by_barcode", {
        product: product,
      });
      setProductBarcode(result.product);
      console.log(productBarcode);

    } catch (err) {
      console.error("Error:", err);

      setError("db error");
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    setRememberText(searchText);
    setProduct([]);
    setProductBarcode(null)
    void fetchSearchAPI(searchText, 1);

    if (searchText.length === 0) {
      setSearching(false)
    }

  };

const handleBarcodeSearch = async () => {
  setError(null);

  try {

    const scanned = await scan({
      formats: [Format.EAN13, Format.EAN8,Format.QRCode],
    });

    console.log("Scan result:", scanned);

    setSearching(true);
    setProduct([]);
    void fetchBarcodeAPI(scanned.content);
  } catch (err) {
    console.error("Barcode scan failed:", err);
  }
};

  const getStatusMessage = () => {
    if (loading) return { text: "Searching..." };
    if (!loading && error) return { text: error, css: "text-red-400  font-bold" };
    if (!loading && !error && product.length === 0 && !Searching)
      return { text: "Search a product" };
    if (!loading && !error && product.length === 0 && Searching)
      return { text: `No products found for "${rememberText}".` };
    return null;
  };

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-3 bg-background overflow-hidden">
        <div className="mr-4 ml-4 flex pt-20">
          <button onClick={()=>{fetchBarcodeAPI("8718452513666")}}>test</button>
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onSearch={handleSearch}
            onBarcodeClick={() => {
              void handleBarcodeSearch();
            }}
            placeholderText="food"
          />

        </div>
      </div>

      {!loading && !Searching && !error && recents.length > 0 ? (
        <div className="pt-15">
          <div className="text-textcolor text-center my-4 font-semibold">Recent searches</div>
          {recents.map((item) => (
            <FoodItemComponent
              key={item.id}
              name={item.product_name}
              nutriments={item.nutriments}
              barcode={item.code}
              brand={item.brands}
              onClick={() => {
                if (!recents.includes(item)) {
                  setRecents([...recents, item]);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="pt-15">
          {(() => {
            const status = getStatusMessage();
            return status ? (
              <div className={`${status.css} text-center text-textcolor my-6`}>
                {status.text}
              </div>
            ) : null;
          })()}

          {product.map((item) => (
            item.nutriments ?
            <FoodItemComponent
              key={item.id ?? item.code}
              name={item.product_name}
              nutriments={item.nutriments}
              barcode={item.code}
              brand={item.brands}
              onClick={() => {
                if (!recents.includes(item)) {
                  setRecents([...recents, item]);
                }
              }}
            />
            : null
            
            ))}
          {productBarcode ? 
                      <FoodItemComponent
              key={1}
              name={productBarcode.product_name}
              nutriments={productBarcode.nutriments}
              barcode={productBarcode.code}
              brand={productBarcode.brands}
              onClick={() => null}
            />: null}
        </div>
      )}
    </>
  );
}
