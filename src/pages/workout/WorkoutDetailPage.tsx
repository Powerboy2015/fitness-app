import { useEffect, useMemo, useState } from "react";
import ExerciseOverviewWidget from "../../components/ExerciseOverviewWidget.tsx";
import { DragDropProvider,} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import StartSessionButton from "../../components/StartSessionButton.tsx";
import { DndManagerdelay } from "../../components/DndManager.tsx";
import { useParams } from "react-router-dom";
import useDetailedWorkout from "../../Hooks/useDetailedWorkout.ts";

interface idRemapper extends ExerciseDTO {
  id: number;
}

export function WorkoutDetailPage() {
  const manager = useMemo(() => DndManagerdelay(), []);
  const [draggableExercise, setDraggableExercise] = useState<idRemapper[]>([]);

  // Gets param from the route /workout/:id <-------
  const params = useParams();
  const workoutId = params.id ?? "";
  const { data, isError, isLoading } = useDetailedWorkout(workoutId);
  const detailedWorkout = data;

  useEffect(() => {
    setDraggableExercise((prev) => {
      if (!detailedWorkout?.exercises) {
        return prev;
      }

      return detailedWorkout.exercises.map((exercise, idx) => {
        return { id: idx, ...exercise } as idRemapper;
      });
    });
  }, [data]);

  //Only reloads the list of draggable exercises elements if the list of those exercises change.
  const overviewList = useMemo(() => {
    return draggableExercise.map((exercise, index) => (
      <ExerciseOverviewWidget
        key={exercise.exercise_id}
        id={exercise.exercise_id}
        index={index}
        name={exercise.name}
        gif={exercise.gif_url}
        exerciseId={exercise.exercise_id}
      />
    ));
  }, [draggableExercise]);

  //event = never because even using the dndkit lib version doesn't make it work. GG
  const handleDragEvent = (event: never) => {
    setDraggableExercise(
      (exercises) => move(exercises, event) as unknown as idRemapper[],
    );
  };

  //Error handling incase the data is not found.
  if (isLoading || isError || !data ) return <h1>Loading.....</h1>;

  return (
    <div
      className="
    fixed inset-0 
    top-15
    bottom-15
    bg-[#1E1E1E] 
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
    pb-30
    "
    >
      <DragDropProvider manager={manager} onDragEnd={handleDragEvent}>
        <ul className="mt-5">{overviewList}</ul>
      </DragDropProvider>

      <div className="fixed bottom-30 w-full">
        <StartSessionButton
          exercises={draggableExercise}
          workoutId={workoutId}
        />
      </div>
    </div>
  );
}
