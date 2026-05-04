import { useEffect, useState } from "react";
import {ExerciseSetUpdate, ITimedSet, IWeightedSet} from "../../types/types.ts";
import WorkoutTimer from "../../components/timers/WorkoutTimer.tsx";
import useSession from "../../Hooks/useSession.ts";
import SessionExerciseItem from "../../components/listItems/SessionExerciseItem.tsx";
import useUpdateSet from "../../Hooks/useUpdateSet.ts";

export default function SessionPage() {
  const [openExercise,setOpenExercise] = useState<number|null>(null);

  const [expandedByExercise, setExpandedByExercise] = useState<boolean[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const session = useSession();

  const setUpdater = useUpdateSet();
  const updateSet = (update: ExerciseSetUpdate) => {
    setUpdater.mutate(update);
  }

  const handleOpen = (setNr:number) => {
    setOpenExercise(prev => prev === setNr ? null : setNr)
  }

  useEffect(() => {
    if (!session.isError || session.isLoading || !session.data) return;

    const startTime = new Date(session.data.start_time).getTime();
    const now = new Date().getTime();
    setElapsedSeconds(Math.floor((now - startTime) / 1000));

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (session.isLoading) return <h1>Loading....</h1>;
  if (session.isError || !session.data) return <h1>Loading....</h1>;

  return (
    <>
      <div className="overflow-y-auto no-scrollbar min-h-full flex flex-col p-4">
        <WorkoutTimer/>

        <section id={"session-exercise-list"} className={"w-full h-full flex flex-col gap-2"}>
        {session.data.exercises.map((exercise,idx) => <SessionExerciseItem onSetUpdate={updateSet} exercise={exercise} onClick={() => handleOpen(idx)} isOpen={openExercise === idx}/>)}
        </section>
      </div>
    </>
  );
}
