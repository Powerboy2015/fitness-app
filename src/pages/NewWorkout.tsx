import {Iworkout, useWorkout} from "../context/WorkoutContext";
import AddExerciseButton from "../components/AddExerciseButton.tsx";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, useRef, useState} from "react";
import {useSortable} from "@dnd-kit/react/sortable";
import { MouseEvent as ReactMouseEvent } from 'react';

export default function NewWorkout() {
  const {workoutName, setWorkoutName, exercises} = useWorkout();

  return (
      <div
          className="
    fixed inset-0 
    top-15
    bottom-15
    bg-[#1E1E1E] 
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
    pb-[env(safe-area-inset-bottom)]
  "
      >
        <input
            type="text"
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="border p-2 rounded bg-[#1E1E1E] border-[#414141] w-[90%] mx-auto flex mt-5"
        />
        <div className="mt-4">
          <h2 className="font-bold text-[#F2F3F2] text-center justify-center mb-2 border-b-2 border-[#414141] w-[90%] flex mx-auto">
            Selected Exercises:
          </h2>
          <ul className="text-center">
            {exercises.map((exercise, idx) => <ExerciseRow exercise={exercise} idx={idx}/>)}
          </ul>
          <AddExerciseButton to="/add-exercises"/>
        </div>
      </div>
  );
}

interface ExerciseRowProps {
  exercise: Iworkout
  idx: number
}

function ExerciseRow({exercise, idx}: ExerciseRowProps): React.ReactNode {
  const navigate = useNavigate();
  const [element, setElement] = useState<HTMLElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const {isDragging} = useSortable({id: exercise.id, index: idx, element, handle: handleRef});
  const {updateExercise} = useWorkout();
  const handleSetUpdate = (setAmt: number) => {
    console.log(setAmt);
    exercise.sets = setAmt;
    updateExercise(idx,exercise);
  }

  return <li
      ref={setElement}
      className={`bg-[#1E1E1E] border-[#414141] border rounded-xl px-2 mb-3 flex w-[90%] items-center mx-auto hover:bg-[#252525] active:bg-[#252525] transition-transform duration-100 ease-in-out ${isDragging ? "opacity-80 scale-[1.05]" : ""} `}
      data-shadow={isDragging || undefined}
  >
    <button
        className="flex w-full h-full py-4"
        onClick={() =>
            navigate("/exercise-description", {
              state: {id: exercise.id},
            })
        }
    >
      <img
          className="h-20 w-20 contain-content rounded-xl"
          src={exercise.gif}
          alt=""
      />
      <div>
        <h2 className="text-lg ml-5 font-semibold">{exercise.name}</h2>
        <SetInput onChange={handleSetUpdate} />
      </div>
    </button>
  </li>
}


interface SetInputProps {
    onChange: (setAmt: number) => void
}
function SetInput({onChange}:SetInputProps): React.ReactNode {
  const [LOWEST_VAL, HIGHEST_VAL] = [0, 99];
  const STEP_SIZE = 1;
  //#TODO tantoe harde hardcode
  const [state, setState] = useState<string>("3");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateState = (val: number) => {
    setState(String(val));
    onChange(val);
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") return setState("");
    if (!/^\d+$/.test(val)) return; // block non-numeric
    const num = Number(val);
    if (num > HIGHEST_VAL) return updateState(HIGHEST_VAL);
    if (num < LOWEST_VAL) updateState(LOWEST_VAL);
    updateState(num);
  }


  const handleElClick = (e:  ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    inputRef.current?.focus();
  }

  return <div className="flex ml-5 flex-row gap-2 border border-[#333737] w-fit rounded p-1 relative" onClick={handleElClick}>
    <input id={"settest"}
           className={"text-right appearance-none min-w-2 max-w10 w-[2ch]"}

           type={"text"}
           inputMode={"numeric"}
           pattern="[0-9]*"
           min={LOWEST_VAL} max={HIGHEST_VAL}
           step={STEP_SIZE}
           placeholder={LOWEST_VAL.toString()}
           onChange={handleInput}
           value={state}
           maxLength={2}
           ref={inputRef}
    />
    <label className={"text-[#979595]"}>Sets</label>
  </div>;
}