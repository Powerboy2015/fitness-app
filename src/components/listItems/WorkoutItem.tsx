import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSortable } from "@dnd-kit/react/sortable";
import API from "../../classes/api.ts";
import {ROUTES} from "../../types/consts.ts";
import useNonTargetClick from "../../Hooks/useNonTargetClick.ts";
import toast from "react-hot-toast";
import {CSSProperties} from "@mui/material";

interface WorkoutItemProps {
    id: string;
    index: number;
    name: string;
    reloadWorkouts: () => void;
}


const shadowCSS: CSSProperties = {
    boxShadow: "4px 4px 0px color-mix(in oklab, gray 20%,var(--color-components))"
}

export default function WorkoutItem({id, index, name, reloadWorkouts}:WorkoutItemProps) {
    // easy drag n drop.
    const {ref,handleRef} = useSortable({id, index});
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${ROUTES.WORKOUTS}/${id}`);
    }

    return<li onClick={handleClick} ref={ref} style={shadowCSS} className={"w-full flex flex-row bg-components h-16 items-center justify-between gap-4 rounded"}>
        <div ref={handleRef} className={"bg-components-hover h-full flex items-center rounded-l"} ><DragIndicatorIcon className={"text-accent"}/></div>
        <span className={"flex-1 rounded-full w-full h-6 text-textcolor font-semibold text-xl"}>{name}</span>
        <DropDownOptions reloadWorkouts={reloadWorkouts} id={id}/>
    </li>
}

interface DropDownOptionsProps {
    reloadWorkouts: () => void,
    id: string
}
function DropDownOptions({reloadWorkouts, id}: DropDownOptionsProps) {
    const [openDropDown,setOpenDropDown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement|null>(null);

    // wrapper for clicking outside a certain element. Closes menu when not clicking on the element.
    useNonTargetClick(() => {
        if(!openDropDown) setOpenDropDown(false);
    }, dropdownRef);

    // Deletes workout, closes dropdown,
    // and reloads workouts, thus removing the workout from the list as well.
    const handleDelete = () => {
        API.workouts.remove(id)
            .then((resp) => toast.success("removed workout: " + resp));
        setOpenDropDown(false);
        reloadWorkouts();


    }

    // Just closes dropDown
    // TODO add edit functionality.
    const handleEdit = () => {
        setOpenDropDown(false);
    }

    // opens the modal. stopPropagation() prevents firing of other functions under it.
    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOpenDropDown(true);
    }

    return <div className="ml-auto cursor-pointer relative text-textcolor" onClick={handleOpen}>
        <MoreVertIcon sx={{ fontSize: 40 }} />
        <div ref={dropdownRef} className={`absolute z-10 top-full right-1 mt-1 flex flex-col rounded-xl p-2 bg-components border border-bordercolor transform transition-all duration-100 ease-out origin-top-right
                 ${openDropDown ? "opacity-100 scale-100" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
            <button className="w-full hover:bg-components-hover flex items-center gap-2 px-3 py-2 rounded-xl" onClick={handleEdit}>
                <EditIcon className="w-5 h-5" /> Edit
            </button>
            <button className="w-full hover:bg-components-hover text-button-stop flex items-center gap-2 px-3 py-2 rounded-xl" onClick={handleDelete}>
                <DeleteIcon className="w-5 h-5" /> Delete
            </button>
        </div>
    </div>
}
