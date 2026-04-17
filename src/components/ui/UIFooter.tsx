import { NavLink } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";

export default function UIFooter() {
    return <footer className="w-full bg-navbar border-t-2 border-bordercolor">
        <nav className="justify-evenly flex">
            <FooterLink to={"/"} name={"Home"}>
                <HomeSharpIcon sx={{ fontSize: 40 }}/>
            </FooterLink>
            <FooterLink to={"/workouts"} name={"Workout"}>
                <FitnessCenterIcon sx={{ fontSize: 40 }}/>
            </FooterLink>
            <FooterLink to={"/kcal-tracker"} name={"Kcal"}>
                <RestaurantSharpIcon sx={{ fontSize: 40 }}/>
            </FooterLink>
            <FooterLink to={"/profile"} name={"profile"}>
                <PersonSharpIcon sx={{ fontSize: 40 }}/>
            </FooterLink>
        </nav>
    </footer>
}

interface FooterLinkProps {
    to: string;
    name: string;
    children: React.ReactElement
}
function FooterLink({to,name,children}: FooterLinkProps) {
    return <NavLink to={to}
        className={({isActive}) => `text-center items-center ${isActive ? 'text-accent' : 'text-icons'}`}>
        {children}
        <p className="text-xs">{name}</p>
    </NavLink>
}