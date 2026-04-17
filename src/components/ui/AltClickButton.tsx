import {HTMLAttributes} from "react";

interface AltClickButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children?: React.ReactElement| string
}

export default function AltClickButton({children,...props}: AltClickButtonProps) {
    return <button{...props} className={"border border-accent rounded-xl p-4 flex flex-col items-center font-bold cursor-pointer col-span-2"}>
        {children}
    </button>
}