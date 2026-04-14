import { useNavigate } from "react-router-dom";
import API from "../classes/api";

interface StartSessionButtonProps {
    exercises?: ExerciseDTO[];
    workoutId: string;
}

export default function StartSessionButton({ exercises, workoutId }: StartSessionButtonProps) {
    const navigate = useNavigate();
    const handleStart = () => {
        API.session.start(workoutId).then ((resp) => {
            if (resp) navigate("/session", { state: { exercises } });
        })
    };
    return (
        <>
            <div className="flex font-bold">
                    <button
                        onClick={handleStart}
                        className="text-textcolor rounded-full p-5 w-[90%] mx-auto bg-orange-accent hover:bg-buttons-action active:bg-buttons-action"
                        >
                        Start Session
                    </button>
            </div>
        </>
    )
}