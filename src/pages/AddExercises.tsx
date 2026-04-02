import ExerciseWidget from "../components/ExerciseWidget";
import { Iworkout, useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import { useMemo ,useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import bicep from "../assets/biceps.jpg";
import tricep from "../assets/triceps.jpg";
import chest from "../assets/chest.jpg";
import abs from "../assets/abs.png.jpg";
import back from "../assets/back.png";
import calves from "../assets/calves.png";
import forearms from "../assets/forearms.png";
import glutes from "../assets/glutes.png.jpg";
import hamstrings from "../assets/hamstrings.png.jpg";
import lats from "../assets/lats.png";
import quads from "../assets/quads.png.jpg";
import shoulders from "../assets/shoulders.png";
import Filter from "../components/Filter";
import UseMuscleFilters from "../Hooks/UseMuscleFilters.ts";
import SelectedExerciseModal from "../components/SelectedExercisesModal.tsx";
import ExerciseDescriptionOverlay from "../components/ExerciseDescriptionOverlay";
import UseExerciseSelection from "../Hooks/UseExerciseSelection.ts";
import useExerciseSelectReducer, { ExercisesActionKind } from "../Hooks/reducers/exerciseSelectReducer.ts";

export default function AddExercises() {
  const [searchText, setSearchText] = useState("");
  const { exercises,selectedIds, setExerciseList } = useWorkout();
  const navigate = useNavigate();


  const {sortedExercises, setMuscle,muscleGroup} = UseMuscleFilters();
  const {state,dispatch} = useExerciseSelectReducer();

  const filteredExercises = useMemo(() => {
    const searchQuery = searchText.toLowerCase();
    return sortedExercises.filter(exercise =>
        exercise.name
            .toLowerCase()
            .includes(searchQuery)
    );
  }, [sortedExercises, searchText]);



  const onSave = () => {
    setExerciseList(state.exercises);
  }


  return (
    <>
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        onSearch={() => {}}
      />
      <div>
        <div
          className="overflow-x-scroll flex
                [&::-webkit-scrollbar-thumb]:bg-neutral-500
                [&::-webkit-scrollbar]:bg-neutral-700"
        >
          <Filter
            gif={chest}
            isSelected={muscleGroup === "pectorals"}
            onClick={() => setMuscle("pectorals")}
          />

          <Filter
            gif={bicep}
            isSelected={muscleGroup === "biceps"}
            onClick={() => setMuscle("biceps")}
          />
          <Filter
            gif={tricep}
            isSelected={muscleGroup === "triceps"}
            onClick={() => setMuscle("triceps")}
          />
          <Filter
            gif={lats}
            isSelected={muscleGroup === "lats"}
            onClick={() => setMuscle("lats")}
          />
          <Filter
            gif={back}
            isSelected={muscleGroup === "upper back"}
            onClick={() => setMuscle("upper back")}
          />
          <Filter
            gif={shoulders}
            isSelected={muscleGroup === "delts"}
            onClick={() => setMuscle("delts")}
          />
          <Filter
            gif={forearms}
            isSelected={muscleGroup === "forearms"}
            onClick={() => setMuscle("forearms")}
          />
          <Filter
            gif={abs}
            isSelected={muscleGroup === "abs"}
            onClick={() => setMuscle("abs")}
          />
          <Filter
            gif={quads}
            isSelected={muscleGroup === "quads"}
            onClick={() => setMuscle("quads")}
          />
          <Filter
            gif={hamstrings}
            isSelected={muscleGroup === "hamstrings"}
            onClick={() => setMuscle("hamstrings")}
          />
          <Filter
            gif={glutes}
            isSelected={muscleGroup === "glutes"}
            onClick={() => setMuscle("glutes")}
          />
          <Filter
            gif={calves}
            isSelected={muscleGroup === "calves"}
            onClick={() => setMuscle("calves")}
          />
        </div>

        {filteredExercises.map((exercise) => {
          return (
            <ExerciseDescriptionOverlay
              key={exercise.exercise_id}
              name={exercise.name}
              gif={exercise.gif_url}
              id={exercise.exercise_id}
              onSelect={() => {
                dispatch({
                  type: ExercisesActionKind.SELECT,
                  payload: {
                    id: exercise.exercise_id,
                    gif: exercise.gif_url,
                    name: exercise.name
                  }})
              }}
              selected={selectedIds.has(exercise.exercise_id)}
            />
          );
        })}
      </div>
      <SelectedExerciseModal dispatch={dispatch} state={state} saveFunc={onSave}/>
    </>
  );
}
