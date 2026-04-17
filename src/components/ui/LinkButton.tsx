import {Link, LinksProps} from "react-router-dom";

interface LinkButtonProps extends LinksProps{
    children: React.ReactElement| string
    to: string;
}

export default function LinkButton({children,to,...props}: LinkButtonProps) {
    return <Link to={to} {...props} className={"bg-accent hover:bg-accent-action active:bg-accent rounded-xl p-4 flex flex-col items-center font-bold cursor-pointer col-span-2"}>
        {children}
    </Link>
}