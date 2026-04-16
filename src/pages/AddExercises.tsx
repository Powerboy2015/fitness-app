import {  useMemo, useState, useRef, useEffect, useReducer  } from "react";
import { Iworkout, useWorkout } from "../context/WorkoutContext";
import SearchBar from "../components/SearchBar.tsx";
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
import cardio from "../assets/cardio.png";
import Filter from "../components/Filter";
import UseMuscleFilters, { muscleGroups } from "../Hooks/UseMuscleFilters.ts";
import SelectedExerciseModal from "../components/SelectedExercisesModal.tsx";
import ExerciseDescriptionOverlay from "../components/ExerciseDescriptionOverlay";
import useExerciseSelectReducer, { ExercisesActionKind } from "../Hooks/reducers/exerciseSelectReducer.ts";
import { useNavigate } from "react-router-dom";

const muscleFilters: { gif: string; name: muscleGroups }[] = [
  { gif: chest, name: "pectorals" },
  { gif: bicep, name: "biceps" },
  { gif: tricep, name: "triceps" },
  { gif: lats, name: "lats" },
  { gif: back, name: "upper back" },
  { gif: shoulders, name: "delts" },
  { gif: forearms, name: "forearms" },
  { gif: abs, name: "abs" },
  { gif: quads, name: "quads" },
  { gif: hamstrings, name: "hamstrings" },
  { gif: glutes, name: "glutes" },
  { gif: calves, name: "calves" },
  { gif: cardio, name: "cardiovascular system"}
];

export default function AddExercises() {
  const [searchText, setSearchText] = useState("");
  const { addExercise } = useWorkout();
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const {state,dispatch} = useExerciseSelectReducer();

    const onSave = () => {
    state.exercises.forEach(exercise => addExercise(exercise));
  }

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    const handleScroll = () => {
      if (listElement) {
        setIsScrollTopVisible(listElement.scrollTop > 0);
      }
    };

    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
  }, []);

  const { sortedExercises, setMuscle, muscleGroup } = UseMuscleFilters();

  const filteredExercises = useMemo(() => {
    const searchQuery = searchText.toLowerCase();
    return sortedExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery))
  }, [sortedExercises, searchText]);

  return (
    <>
      <div className="h-screen">
        <div className="fixed pl-5 pr-5 top-16 left-0 right-0 z-30 bg-[#161818] overflow-hidden">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onSearch={() => {}}
            placeholderText="exercise"
          />
          <div
            className="overflow-x-scroll flex
                  [&::-webkit-scrollbar-thumb]:bg-neutral-500
                  [&::-webkit-scrollbar]:bg-neutral-700"
          >
            {muscleFilters.map(({ gif, name }) => (
              <Filter
                key={name}
                gif={gif}
                isSelected={muscleGroup === name}
                onClick={() => {
                  scrollToTop();
                  setMuscle(name);
                }}
              />
            ))}
          </div>
          <div className="fixed top-60 right-10 pointer-events-none z-100">
            <button
              onClick={scrollToTop}
              className={`w-13 h-13 bg-[#414141] hover:bg-[#353535] rounded-full transition-all duration-100 ease-in-out ${isScrollTopVisible ? "opacity-95 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              ↑
            </button>
          </div>
          <div
            ref={listRef}
            className="overflow-y-auto overscroll-behavior-y-auto h-[calc(100vh-18rem)]"
          >
            {filteredExercises.map((exercise) => {
              return (
                <ExerciseDescriptionOverlay
                  key={exercise.exercise_id}
                  name={exercise.name}
                  gif={exercise.gif_url}
                  id={exercise.exercise_id}
                  selected={false}
                  onSelect={() => {
                    dispatch({
                      type: ExercisesActionKind.SELECT,
                      payload: {
                        id: exercise.exercise_id,
                        gif: exercise.gif_url,
                        name: exercise.name
                      }
                    })
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <SelectedExerciseModal dispatch={dispatch} state={state} saveFunc={onSave}/>
    </>
  );
}
