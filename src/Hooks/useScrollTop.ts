import {RefObject, useRef} from "react";

interface useScrollTopReturns {
    scrollFunc: () => void;
    scrollRef: RefObject<Element|null>
}

/**
 * sends a ref and a function to scroll said ref to top.
 */
export default function useScrollTop(): useScrollTopReturns {
    const scrollRef = useRef<Element>(null);

    const scrollTop = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({ top: 0 });
    }
    
    return {
        scrollFunc: scrollTop,
        scrollRef
    }
}