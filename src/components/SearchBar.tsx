import React from "react";
import { BarcodeIcon } from "./SVG";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholderText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholderText}) => {
    const showBarcode = placeholderText === "food";

    return (
        <div className="flex items-center gap-2 w-full justify-between mt-3 mb-2">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder={`Search ${placeholderText}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-components border border-bordercolor rounded-lg pl-3 py-2 text-white focus:outline-none focus:border-accent"
                />
                    {showBarcode && (
                        <button
                        className="absolute right-3 top-1/2 w-6 -translate-y-1/2 text-accent hover:text-accent-action active:text-accent-action transition-colors cursor-pointer"
                            type="button"
                        >
                            <BarcodeIcon className="text-current" />
                        </button>
                )}
            </div>
            <button
                className="h-11 w-11 rounded-lg bg-[#2e2e2e] border border-[#565d5d] flex items-center justify-center text-[#F67631] hover:text-[#ff8c42] active:text-[#a24b14] active:bg-[#282727] transition-colors"
                type="button"
                onClick={onSearch}
            >
                <SearchIcon sx={{ color: "currentColor" }} />
            </button>
        </div>
    );
};

export default SearchBar;