import {HTMLAttributes} from "react";

interface ClickButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children?: React.ReactElement| string
}

export default function ClickButton({children,...props}: ClickButtonProps) {
    return <button{...props} className={" bg-accent hover:bg-accent-action active:bg-accent rounded-xl p-4 flex flex-col items-center font-bold cursor-pointer col-span-2"}>
        {children}
    </button>
}