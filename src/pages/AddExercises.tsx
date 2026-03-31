import ExerciseWidget from "../components/ExerciseWidget";
import {ReactElement, ReactNode, useMemo, useState} from "react";
import { Iworkout, useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
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
import { List, RowComponentProps, } from "react-window";

export const ZINDEX = {
  default: 1,
  UI: 2,
  POPUPS: 3,
  NAVIGATION:4
};


export default function AddExercises() {
  const [searchText, setSearchText] = useState("");

  


  const {sortedExercises, setMuscle,muscleGroup} = UseMuscleFilters();

  const filteredExercises = useMemo(() => {
    const searchQuery = searchText.toLowerCase();
    return sortedExercises.filter(exercise =>
        exercise.name
            .toLowerCase()
            .includes(searchQuery)
    );
  }, [sortedExercises, searchText]);


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
        <List
        rowComponent={exerciseRow}
        rowCount={filteredExercises.length}
        rowHeight={300}
        rowProps={{exercises: filteredExercises}}
        >


        </List>
      </div>
      <SelectedExerciseModal/>
    </>
  );
}



function exerciseRow({exercises,index}:RowComponentProps<{exercises: ExerciseDTO[]}>): ReactElement {
  const { addExercise, selectedIds } = useWorkout();
  const exercise = exercises[index];
  return <>
    <ExerciseWidget
    name={exercise.name}
    id={exercise.exercise_id}
    gif={exercise.gif_url}
    onSelect={() => {
      addExercise({
        id: exercise.exercise_id,
        name: exercise.name,
        gif: exercise.gif_url,
      });
      }}
      selected={selectedIds.has(exercise.exercise_id)}
    />
  </>;
  }