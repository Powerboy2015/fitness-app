import { InputHTMLAttributes} from "react";

interface FitInputProps extends InputHTMLAttributes<HTMLInputElement>{
}

export default function FitInput({...props}: FitInputProps) {
    return<div className={"p-2 bg-components border border-bordercolor rounded text-textcolor"}>
        <input className={"w-full reset"} {...props}/>
    </div>
}