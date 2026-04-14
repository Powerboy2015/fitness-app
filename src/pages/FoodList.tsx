import FoodItemComponent from "../components/FoodItemComponent.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { useState, useMemo } from "react";

export default function FoodList() {
    const [searchText, setSearchText] = useState("");
    if (history.length == 0 ) return <h1>Loading...</h1>

    return (
        <>
        <SearchBar
            value={searchText}
            onChange={setSearchText}
            onSearch={() => {}}
            placeholderText="food"/>
            <div className="h-full">

                <FoodItemComponent/>
                {/* <div className="pt-2">
                    {history.map((,) => (
                        <FoodListWidget key={} />
                    ))}
                </div> */}
            </div>
        </>
    );
}
