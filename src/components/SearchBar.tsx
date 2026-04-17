import React from "react";
import { BarcodeIcon } from "./SVG";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholderText: string;
    onclick: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholderText, onclick }) => {
    const showBarcode = placeholderText === "food";

    return (
        <div>
            <div className="input_wrapper relative w-87 justify-center mx-auto mb-3 mt-3" onClick={() => onclick()}>
                <input

                    type="text"
                    placeholder={`Search ${placeholderText}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-components border border-bordercolor rounded-lg pl-3 pr-12 py-2 text-textcolor focus:outline-none focus:border-accent"
                />
                <button
                    className="search__button absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-accent-action active:text-accent-action transition-colors"
                    type="button"
                    onClick={onSearch}
                >
                    <SearchIcon />
                </button>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-3">
                    {showBarcode && (
                        <button
                            className="text-accent hover:text-accent-action active:text-accent-action transition-colors cursor-pointer"
                            type="button"
                        >
                            <BarcodeIcon className="text-current" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;