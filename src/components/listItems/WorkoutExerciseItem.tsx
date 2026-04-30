import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../types/consts.ts";

interface WorkoutExerciseItemProps {
  // id: string;
  // index: number;
  name: string;
  gif: string;
  exerciseId: string;
}

export default function WorkoutExerciseItem({
  // id,
  // index,
  name,
  gif,
  exerciseId,
}: WorkoutExerciseItemProps) {
  const navigate = useNavigate();
  // const [element, setElement] = useState<HTMLElement | null>(null);
  // const handleRef = useRef<HTMLButtonElement | null>(null);
  // const { isDragging } = useSortable({ id, index, element, handle: handleRef });


  return (
    <li
      // ref={setElement}
      className={`bg-components border-bordercolor border rounded-xl px-2 flex w-full items-center hover:bg-components-hover active:bg-components-hover transition-transform duration-100 ease-in-out ${null/*isDragging ? "opacity-80 scale-[1.05]" : ""*/} `}
      // data-shadow={isDragging || undefined}
    >
      <button
        className="flex w-full h-full py-2"
        onClick={() =>
          navigate(ROUTES.EXERCISES, { // TODO add dynamic route.
            state: { id: exerciseId },
          })
        }
      >
        <img
          className="h-20 w-20 contain-content rounded-lg"
          src={gif}
          loading="lazy"
          decoding="async"
          alt=""
        />
        <h2 className="text-lg ml-5 font-semibold text-textcolor">{name}</h2>
      </button>
    </li>
  );
}
