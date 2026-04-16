import ExerciseWidget from "../components/ExerciseWidget";
import {useMemo, useState} from "react";
import { Iworkout, useWorkout } from "../context/WorkoutContext";
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
import ExerciseDescriptionOverlay from "../components/ExerciseDescriptionOverlay";
import { List, RowComponentProps } from "react-window";
import UseExerciseList from "../Hooks/UseExerciseList.ts";

export default function AddExercises() {
  const [searchText, setSearchText] = useState("");
  const { addExercise } = useWorkout();

  const {exercises, setMuscle,muscleGroup, setQuery, LoadNextPage} = UseExerciseList();


  return (
    <>
      <SearchBar
        value={searchText}
        onChange={(query) => {
          setSearchText(query);
          setQuery(query);
        }}
        onSearch={() => {}}
      />
      <div className="">
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
          rowComponent={exerciseListItem}
          rowHeight={128}
          rowCount={exercises.length}
          rowProps={{exerciseList: exercises, addExercise}}
          className="pb-4"
        />
        <div className="px-4">
        <button 
        className=" bg-amber-700 w-full rounded mb-25"
        onClick={() => {LoadNextPage()}}>load more</button>
        </div>
      </div>
    </>
  );
}

interface exerciseListItemProps {
  exerciseList: ExerciseDTO[];
  addExercise: (workout: Iworkout) => void;
} 
function exerciseListItem({index, style, addExercise,exerciseList}: RowComponentProps<exerciseListItemProps> ) {
  const exercise = exerciseList[index];

  return <div style={style} className="p-4">
    <ExerciseDescriptionOverlay
              key={exercise.exercise_id}
              name={exercise.name}
              gif={exercise.gif_url}
              id={exercise.exercise_id}
              onSelect={() => {
                addExercise({
                  id: exercise.exercise_id,
                  name: exercise.name,
                  gif: exercise.gif_url,
                });
              }}
              />
  </div>
}