import {RefObject, useRef} from "react";

interface useScrollTopReturns {
    scrollFunc: () => void;
    scrollRef: RefObject<Element|null>
    restoreScroll: () => void,
    saveScroll: () => void,
    resetScroll:() => void
}

/**
 * sends a ref and a function to scroll said ref to top.
 */
export default function useScroll(key?:string): useScrollTopReturns {
    const scrollRef = useRef<Element>(null);

    const reset = () => {
        if (key) sessionStorage.removeItem(key);
    }

    const restore = () => {
        if (key) {
            const saved = sessionStorage.getItem(key);
            console.log('saved:', saved);
            console.log('ref:', scrollRef.current);
            console.log('scrollTop before:', scrollRef.current?.scrollTop);
            if (saved && scrollRef.current) {
                scrollRef.current.scrollTop = Number(saved);
                console.log('scrollTop after:', scrollRef.current?.scrollTop);
            }
        }
    }

    const save = () => {
        if (key) sessionStorage.setItem(key, String(scrollRef.current?.scrollTop ?? 0));
    };

    const scrollTop = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({ top: 0 });
    }
    
    return {
        scrollFunc: scrollTop,
        scrollRef,
        restoreScroll: restore,
        saveScroll:save,
        resetScroll: reset
    }
}