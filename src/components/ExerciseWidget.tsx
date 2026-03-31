import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

interface ExerciseWidgetProps {
  name: string;
  gif: string;
  id: string;
  onSelect?: () => void;
}

export default function ExerciseWidget({
  name,
  gif,
  id,
  onSelect,
}: ExerciseWidgetProps) {
  const navigate = useNavigate();

  const [added,isAdded] = useState<boolean>(false);

  const handleClick = () => {
    if (!onSelect || added) return;
    onSelect();
    isAdded(true);

    setTimeout(() => {
      isAdded(false);
    },2000);
  }


  return (
    <div className="bg-[#1E1E1E] border-[#414141] border rounded-xl px-2 mb-3 flex w-[90%] items-center mx-auto hover:bg-[#252525] active:bg-[#252525] cursor-pointer mt-2">
      <button
        className="flex w-full h-full py-4"
        onClick={() =>
          navigate("/exercise-description", {
            state: { id: id },
          })
        }
      >
        <img
          className="rounded-xl w-20 h-20 mr-4"
          alt={name}
          src={gif}
          loading="lazy"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
      </button>
      <button
        onClick={handleClick}
        className="flex h-12 w-12 rounded-full bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] ml-2 z-50"
      >
        {!added ? <AddIcon sx={{ fontSize: 49 }} /> : <CheckIcon sx={{ fontSize: 49 }} />}
      </button>
    </div>
  );
}
