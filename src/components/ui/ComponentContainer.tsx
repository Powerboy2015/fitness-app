import {HTMLAttributes} from "react";
import {twMerge} from "flowbite-react/helpers/tailwind-merge";

interface ItemComponentProps extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactElement | React.ReactElement[]
}

/**
 * Default styling for the borders and backgrounds around components.
 * @constructor
 */
export default function ComponentContainer({children,...props}:ItemComponentProps) {
    return <>
        <div {...props}
             className={twMerge(`bg-components border-bordercolor border rounded-xl w-full hover:bg-components-hover active:bg-components-hover px-4 py-2 flex flex-col`,props.className)}>
            {children}
        </div>
    </>
}