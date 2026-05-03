import {useEffect, useState} from "react";
/**
 * Creates a delay before a value is changed.
 * @param value
 * @param delay
 */
export function useDebounce<T> (value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value, delay]);

    return debouncedValue
}