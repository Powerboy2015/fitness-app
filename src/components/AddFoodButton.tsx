import { useNavigate } from "react-router-dom";

export default function AddFoodButton({ to = "/add-food" }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="flex justify-center z-20 cursor-pointer mx-auto h-16 items-center font-bold w-full rounded-full bg-orange-accent hover:bg-buttons-action active:bg-buttons-action"
        >
            Add food
        </button>
    );
}

