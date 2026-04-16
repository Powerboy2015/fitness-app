import FoodItemComponent from "../components/FoodItemComponent.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { useState, useMemo } from "react";

const mockFoodItems = [
    { id: 1, name: "Apple", calories: 52 },
    { id: 2, name: "Banana", calories: 89 },
    { id: 3, name: "Orange", calories: 47 },
    { id: 4, name: "Strawberry", calories: 32 },
    { id: 5, name: "Mango", calories: 60 },
    { id: 6, name: "Pineapple", calories: 50 },
    { id: 7, name: "Blueberry", calories: 57 },
    { id: 8, name: "Watermelon", calories: 30 },
    { id: 8, name: "Mango", calories: 30 },
    { id: 8, name: "Grapefruit", calories: 30 },
    { id: 8, name: "Grapes", calories: 30 },
    { id: 8, name: "Kiwi", calories: 30 },
];

export default function FoodList() {
    const [searchText, setSearchText] = useState("");

    return (
        <>
        <div className="fixed top-16 left-0 right-0 z-30 bg-[#161818] overflow-hidden">
            <SearchBar
                value={searchText}
                onChange={setSearchText}
                onSearch={() => {}}
                placeholderText="food"
            />
        </div>

        <div className="pt-15">
            {mockFoodItems.map((item) => (
                <FoodItemComponent key={item.id} name={item.name} />
            ))}
        </div>
        </>
    );
}
