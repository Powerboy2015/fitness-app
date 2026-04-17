import {Link, LinksProps} from "react-router-dom";
import {RouteName} from "../../router/AppRouter.tsx";

interface LinkButtonProps extends LinksProps{
    children: React.ReactElement| string
    to: RouteName;
}

export default function LinkButton({children,to,...props}: LinkButtonProps) {
    return <Link to={to} {...props} className={"bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] rounded-xl p-6 flex flex-col items-center font-bold cursor-pointer col-span-2"}>
        {children}
    </Link>
}