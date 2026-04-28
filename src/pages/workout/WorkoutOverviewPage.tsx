import WorkoutWidget from "../../components/WorkoutWidget.tsx";
import WorkoutAddButton from "../../components/WorkoutAddButton.tsx";
import { useState, useEffect, useMemo } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { DndManagerdelay } from "../../components/DndManager.tsx";
import useWorkouts from "../../Hooks/useWorkouts.ts";

// I quite genuinely have to remap my UUID to id because of muks lib. I hate libs.
type dndLibModifier = {
  id: string;
  name: string;
  desc?: string;
};

export default function WorkoutOverviewPage() {
  const manager = useMemo(() => DndManagerdelay(), []);
  const workoutList = useWorkouts();
  const [workouts, setWorkouts] = useState<dndLibModifier[]>([]);

  //sets the data according to what dndLibModifier needs.
  useEffect(() => {
    if (!workoutList.data) return;
    setWorkouts(workoutList.data.map(workout => ({
      id: workout.uuid,
      ...workout,
    } satisfies dndLibModifier)));
  }, [workoutList.data]);

  //holds the list components
  const workoutItemList = useMemo(() => {
    return workouts.map((workout, index) => (
      <WorkoutWidget
        key={workout.id}
        id={workout.id}
        index={index}
        name={workout.name}
        reloadWorkouts={() => workoutList.refetch()}
      />
    ));
  }, [workouts, workoutList.refetch]);

  if (workoutList.isError || workoutList.isLoading || !workoutList.data) return <h1>Loading....</h1>;

  // if the list is still empty, return a incentive to create an workout.
  if (Object.keys(workouts).length < 1)
    return (
      <div
        className="
    fixed inset-0 
    top-15
    bg-[#1E1E1E] 
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
    pb-[env(safe-area-inset-bottom)]
  "
      >
        <ul className="pt-2 text-center text-gray-400">
          <li>No workouts yet. Create a new one!</li>
        </ul>
        <div className="fixed bottom-30 left-0 right-0 flex justify-center z-20">
          <WorkoutAddButton to="/new-workout" />
        </div>
      </div>
    );

  return (
    <>
      <div
        className="
    fixed inset-0 
    top-15
    bottom-15
    bg-[#1E1E1E] 
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
 pb-20
  "
      >
        <DragDropProvider
          manager={manager}
          onDragEnd={(event) => {
            // #TODO add local backend ordering.
            setWorkouts((workout) => move(workout, event));
          }}
        >
          <ul className="pt-5 pb-17">
            {workoutItemList}
          </ul>
        </DragDropProvider>
      </div>
      <div className="fixed bottom-30 left-0 right-0 flex justify-center z-20">
        <WorkoutAddButton to="/new-workout" />
      </div>
    </>
  );
}
