import { useNavigate } from "react-router-dom";

export default function GreenAddButton({ to = "/new-workout" }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="text-textcolor cursor-pointer mx-auto sticky bottom-2 h-16 justify-center items-center font-bold w-[90%] rounded-full bg-orange-accent hover:bg-buttons-action active:bg-buttons-action flex z-30"
        >
            Add Exercise
        </button>
    );
}