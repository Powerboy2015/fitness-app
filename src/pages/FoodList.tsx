import FoodItemComponent from "../components/FoodItemComponent.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

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
  skip: number;
}
//pls work github
export default function FoodList() {
  const [product, setProduct] = useState<searchItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [recents, setRecents] = useState<searchItem[]>([])

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

  function handleSearch() {
    fetchSearchAPI(searchText, 1)
  }

  return (
    <>
      {!searchText ?
        <div className="fixed top-16 left-0 right-0 z-3 bg-[#161818] overflow-hidden">
          <div className=" mr-10 ml-7 flex">

            <SearchBar
              value={searchText}
              onChange={setSearchText}
              onSearch={() => { }}
              placeholderText="food"
              onclick={() => setProduct([])}
            />
            <button className="ml-3" onClick={() => handleSearch()}><SearchIcon /></button>
          </div>
          recent searches
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
        </div >
        :
        <div className="fixed top-16 left-0 right-0 z-3 bg-[#161818] overflow-hidden">

          <div className=" mr-10 ml-7 flex">
            <SearchBar
              value={searchText}
              onChange={setSearchText}
              onSearch={() => { }}
              placeholderText="food"
              onclick={() => {setProduct([]), handleSearch()}}
            />
            <button className="ml-3" onClick={() => handleSearch()}><SearchIcon /></button>
          </div>

          {product.map((item) => (
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
      }
    </>
  )
}
