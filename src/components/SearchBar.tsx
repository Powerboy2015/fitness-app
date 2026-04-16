import React from "react";
import { BarcodeIcon } from "./SVG";
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholderText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholderText}) => {
    const showBarcode = placeholderText === "food";

    return (
        <div>
            <div className="input_wrapper relative w-87 justify-center mx-auto mb-3 mt-3">
                <input
                    type="text" 
                    placeholder={`Search ${placeholderText}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#2e2e2e] border border-[#565d5d] rounded-lg pl-3 pr-12 py-2 text-white focus:outline-none focus:border-[#F67631]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-3">
                    {showBarcode && (
                        <button
                            className="text-[#F67631] hover:text-[#ff8c42] active:text-[#ff8c42] transition-colors cursor-pointer"
                            type="button"
                        >
                            <BarcodeIcon className="w-6" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;