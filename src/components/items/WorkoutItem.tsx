import ComponentContainer from "../ui/ComponentContainer.tsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IWorkoutModified} from "../../Hooks/UseWorkouts.ts";
import {Delete, Edit, MoreVert} from "@mui/icons-material";


interface WorkoutItemProps {
    workoutObj: IWorkoutModified
    onDelete: (id:string) => Promise<void>
}
export default function WorkoutItem({workoutObj, onDelete}: WorkoutItemProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleMenuClose(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", handleMenuClose);
        return () => document.removeEventListener("pointerdown", handleMenuClose);
    }, []);

    const handleNavigation = () => {
        navigate("/exercises");
    };
    return <>
        <ComponentContainer className={"flex-row items-center justify-between"}>
            <button ref={handleRef} className="cursor-grab">
            </button>

            <button className="text-left cursor-pointer w-full h-full py-4" onClick={() => handleNavigation()}>
                <h2 className="text-lg font-semibold text-textcolor">{workoutObj.name}</h2>
            </button>

            <div ref={dropdownRef} className="ml-auto cursor-pointer relative text-textcolor" onClick={() => setOpen((prev) => !prev)}>
                <MoreVert sx={{ fontSize: 40 }} />
                <div className={`absolute z-10 top-full right-1 mt-1 flex flex-col rounded-xl p-2 bg-components border border-bordercolor transform transition-all duration-100 ease-out origin-top-right 
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                    <button className="w-full hover:bg-components-hover flex items-center gap-2 px-3 py-2 rounded-xl" onClick={() => {setOpen(false); navigate("/edit-workout");}}>
                        <Edit className="w-5 h-5" /> Edit
                    </button>
                    <button className="w-full hover:bg-components-hover text-button-stop flex items-center gap-2 px-3 py-2 rounded-xl" onClick={() => {setOpen(false);
                        onDelete(workoutObj.id);
                    }}>
                        <Delete className="w-5 h-5" /> Delete
                    </button>
                </div>
            </div>
        </ComponentContainer>
    </>
}