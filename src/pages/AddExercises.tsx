import ExerciseWidget from "../components/ExerciseWidget";
import { useEffect, useRef, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import API from "../classes/api";
import SearchBar from "../components/SearchBar";
import { invoke } from "@tauri-apps/api/core";
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

const muscleFilters = [
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
];

export default function AddExercises() {
  const [allExercises, setAllExercise] = useState<ExerciseDTO[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [muscle, setMuscle] = useState<string>("");
  const { addExercise } = useWorkout();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  async function fetchExercises() {
    const result = await API.exercises.list();
    setAllExercise(result);
    console.log(activeQuery);
  }

  interface ExerciseResponse {
    data: ExerciseDTO[];
    ok: boolean;
  }

  async function loadExercises() {
    try {
      const res = await invoke<ExerciseResponse>("get_exercises_by_muscle", {
        muscle: muscle,
      });
      setAllExercise(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setActiveQuery(searchText);
  }, [searchText]);

  useEffect(() => {
    if (muscle === "") return;
    loadExercises();
  }, [muscle]);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [muscle, activeQuery]);

  const filteredExercises = allExercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(activeQuery.toLowerCase()),
  );

  function handleFilterClick(muscleInput: string) {
    console.log(muscle);
    if (muscle === muscleInput) {
      setMuscle("");
      fetchExercises();
    } else setMuscle(muscleInput);
  }

  return (
    <>
    <div className="h-screen">
      <div className="fixed top-16 left-0 right-0 z-30 bg-[#161818] overflow-hidden">
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        onSearch={() => setActiveQuery(searchText)}
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
              isSelected={muscle === name}
              onClick={() => handleFilterClick(name)}
            />
          ))}
        </div>
      </div>

      <div ref={listRef} className="mt-38 overflow-y-auto overscroll-behavior-y-auto h-[calc(100vh-14rem)]">
        {filteredExercises.map((exercise) => {
          return (
            <ExerciseWidget
              key={exercise.id}
              name={exercise.name}
              gif={exercise.data}
              onSelect={() => {
                addExercise({
                  id: exercise.id,
                  name: exercise.name,
                  gif: exercise.data,
                });
                navigate(-1);
              }}
            />
          );
        })}
      </div>
    </div>
    </>
  );
}
