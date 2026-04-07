import { useEffect, useState } from "react";
import CountDownTimer from "../components/CountDownTimer";
import StopWatch from "../components/StopWatch";
import TabataTimer from "../components/TabataTimer";
import { CurrentExercise } from "../components/CurrentExercise.tsx";
import Plusknop from "../components/plusknop.tsx";
import FinishWorkoutButton from "../components/FinishWorkoutButton";
import API from "../classes/api.ts";

export default function Session() {
  const [selectedTimer, setSelectedTimer] = useState("stopwatch");
  const [expandedByExercise, setExpandedByExercise] = useState<boolean[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSession, setCurrentSession] = useState<ISessionState>();

  useEffect(() => {
    const getState = async () => {
      const resp = await API.session.get();
      console.log(resp);
      if (typeof resp !== "string") {
        setCurrentSession(resp);
        setExpandedByExercise(Array(resp.exercises.length).fill(false));
      }
    };
    getState();
  }, []);

  const updateState = async() => {
    const resp = await API.session.get();
    if (typeof resp === "string") throw new Error(resp);
    setCurrentSession(resp);
  }

  useEffect(() => {
    if (!currentSession) return;

    const startTime = new Date(currentSession.start_time).getTime();
    const now = new Date().getTime();
    setElapsedSeconds(Math.floor((now - startTime) / 1000));

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const handleAddSet = (exerciseIndex: number) => {
      if (!currentSession) return;
      API.session.addSet(exerciseIndex).then(() => updateState());
  };

  const handleDeleteSet = (exerciseIndex: number) => {
      if (!currentSession) return;
      API.session.removeSet(exerciseIndex).then(() => updateState());

  };

  if (!currentSession) return <h1>Loading....</h1>;

  return (
    <>
      <div
        className="w-full flex flex-col items-center     fixed inset-0 
    top-15
    bottom-15
    bg-[#1E1E1E] 
    overflow-y-auto
    pt-[env(safe-area-inset-top)]
pb-30
    
    "
      >
        <div className="relative mb-6 mt-5">
          {selectedTimer === "countdown" && (
            <CountDownTimer onTimerChange={setSelectedTimer} />
          )}
          {selectedTimer === "stopwatch" && (
            <StopWatch onTimerChange={setSelectedTimer} />
          )}
          {selectedTimer === "tabata" && (
            <TabataTimer onTimerChange={setSelectedTimer} />
          )}
        </div>

        {currentSession.exercises.length === 0 ? (
          <div className="w-87 bg-[#1E1E1E] border-2 border-[#565d5d] rounded-xl p-4 mb-4 text-center">
            <p className="text-white">No exercises selected.</p>
          </div>
        ) : (
          currentSession.exercises.map((exercise, exerciseIndex) => {
            const isCardio =
              exercise.sets.length > 0 && exercise.sets[0].type === "Timed";

            return (
              <CurrentExercise
                key={exercise.exercise_id}
                exerciseData={exercise}
                isExpanded={expandedByExercise[exerciseIndex] || false}
                onToggle={() => {
                  const next = [...expandedByExercise];
                  next[exerciseIndex] = !next[exerciseIndex];
                  setExpandedByExercise(next);
                }}
                onDeleteSet={(setIndex) =>
                  handleDeleteSet(exerciseIndex)
                }
              >
                {!isCardio && (
                  <Plusknop
                    onClick={() => handleAddSet(exerciseIndex)}
                    className="mt-3 w-77 h-12 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a]  justify-center transition-colors"
                    iconSize={32}
                  />
                )}
              </CurrentExercise>
            );
          })
        )}
        <div className="">
          <FinishWorkoutButton elapsedSeconds={elapsedSeconds} />
        </div>
      </div>
    </>
  );
}