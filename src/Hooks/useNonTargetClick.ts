import {RefObject, useEffect} from "react";

/**
 * Small When clicking on something that is not the given ref, fires the given function.
 * @param responseFunc the function to be fired when we don't click the ref.
 * @param refEl the referenced element that is supposed to be clicked. Required to be a Ref
 */
export default function useNonTargetClick(responseFunc:() => void,refEl:RefObject<HTMLElement|null>|null){

    useEffect(() => {
        function handleMenuClose(event: MouseEvent) {
            if (
                refEl &&
                !refEl.current?.contains(event.target as Node)
            ) {
                responseFunc();
            }
        }
        document.addEventListener("pointerdown", handleMenuClose);
        return () => document.removeEventListener("pointerdown", handleMenuClose);
    }, []);
}