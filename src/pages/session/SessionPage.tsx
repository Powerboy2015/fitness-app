import { useEffect, useState } from "react";
import { ITimedSet, IWeightedSet} from "../../types/types.ts";
import WorkoutTimer from "../../components/timers/WorkoutTimer.tsx";
import useSession from "../../Hooks/useSession.ts";
import SessionExerciseItem from "../../components/listItems/SessionExerciseItem.tsx";

export default function SessionPage() {
  const [expandedByExercise, setExpandedByExercise] = useState<boolean[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const session = useSession();

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


  const handleCompleteSet = (exerciseIndex: number) => {
    setSession((prevSession) => {
      if (!prevSession) return prevSession;

      const exercise = prevSession.exercises[exerciseIndex];
      if (!exercise || exercise.sets.length === 0) return prevSession;

      const areAllCompleted = exercise.sets.every((set) => Boolean(set.time_completed));
      const completionTime = areAllCompleted ? "" : new Date().toISOString();
      const isTimedExercise = exercise.sets[0].type === "Timed";

      const nextSets = isTimedExercise
        ? (exercise.sets as ITimedSet[]).map((set) => ({
            ...set,
            time_completed: completionTime,
          }))
        : (exercise.sets as IWeightedSet[]).map((set) => ({
            ...set,
            time_completed: completionTime,
          }));

      if (!areAllCompleted) {
        setExpandedByExercise((prevExpanded) => {
          const nextExpanded = [...prevExpanded];
          nextExpanded[exerciseIndex] = false;
          return nextExpanded;
        });
      }

      const nextExercises = [...prevSession.exercises];
      nextExercises[exerciseIndex] = {
        ...exercise,
        sets: nextSets,
      };

      return {
        ...prevSession,
        exercises: nextExercises,
      };
    });
  };

  if (session.isLoading) return <h1>Loading....</h1>;
  if (session.isError || !session.data) return <h1>Loading....</h1>;

  return (
    <>
      <div className="overflow-y-auto no-scrollbar min-h-full flex flex-col p-4">
        <WorkoutTimer/>

        <section id={"session-exercise-list"} className={"w-full h-full flex flex-col gap-2"}>
        {session.data.exercises.map(exercise => <SessionExerciseItem exercise={exercise}/>)}
        </section>
      </div>
    </>
  );
}
