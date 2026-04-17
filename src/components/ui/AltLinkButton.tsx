import {Link, LinksProps} from "react-router-dom";
import {RouteName} from "../../router/AppRouter.tsx";

interface AltLinkButtonProps extends LinksProps{
    children: React.ReactElement| string
    to: RouteName;
}

export default function AltLinkButton({children,to,...props}: AltLinkButtonProps) {
    return <Link to={to} {...props} className={"border border-accent rounded-xl p-4 flex flex-col items-center font-bold cursor-pointer col-span-2"}>
        {children}
    </Link>
}