import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../classes/api.ts";
import AddIcon from "@mui/icons-material/Add";
import {WorkoutOutletContext} from "../../components/routers/WorkoutRoutes.tsx";
import {ExerciseDTO} from "../../types/types.ts";
import {Iworkout} from "../../context/WorkoutContext.tsx";
export default function ExerciseDescription() {
  // Gets params from the route workouts/create/exercises/:id <-
  const params = useParams();
  const navigate = useNavigate();

  const {setTempWorkout} = useOutletContext<WorkoutOutletContext>();
  const [id] = useState<string>(params.id || "");
  const [name, setName] = useState<string>("");
  const [equipments, setEquipments] = useState<string[]>([]);
  const [gif, setgif] = useState<string | undefined>(undefined);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [targetMuscle, setTargetMuscle] = useState<string[]>([]);
  const [exercise,setExercise] = useState<ExerciseDTO|null>(null);
  const [error, setError] = useState<Boolean>(false);


  useEffect(() => {
    void getExerciseById();
  }, [id]);

  const addExercise = () => {
    if(!exercise) return;
    const exerciseObj: Iworkout = {
      name: exercise.name,
      gif: exercise.gif_url,
      id //for some fucking reason exercise.exercise_id is empty.
    };
    setTempWorkout(prev => {
      return {...prev,exercises: [...prev.exercises, exerciseObj]}
    });

    navigate(-1,);
  }

  async function getExerciseById() {
    if (id !== "") {
      try {
        const res = await API.exercises.get(id);

        setEquipments(JSON.parse(res.equipments));
        setgif(res.gif_url);
        setInstructions(JSON.parse(res.instructions));
        setName(res.name);
        setSecondaryMuscles(JSON.parse(res.secondary_muscles));
        setTargetMuscle(JSON.parse(res.target_muscles));
        setExercise(res);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
  }

  if (error) return;

  return (
      <div className="h-full flex flex-col p-4 bg-background overflow-y-scroll">
        <div className="w-full max-w-3xl bg-components border border-bordercolor rounded-xl p-6 font-bold">
          <h2 className="text-textcolor text-2xl mb-2 border-b-2 border-bordercolor">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <img src={gif} alt="" loading="lazy" className="w-full rounded-lg"/>
          <h2 className="text-textcolor text-2xl mt-5 border-b-2 border-bordercolor">
            Targeted muscles:
          </h2>
          <div className="bg-accent w-fit px-6 py-1 rounded-xl mx-auto my-2">
            {targetMuscle}
          </div>
          <div className="grid grid-cols-2 text-center">
            {secondaryMuscles.map((muscle, index) => (
                <div
                    key={index}
                    className="border-accent border px-3 text-xs py-1 rounded-xl mx-2 my-1 text-textcolor"
                >
                  {muscle}
                </div>
            ))}
          </div>
          <h2 className="text-textcolor text-2xl mt-5 border-b-2 border-bordercolor">
            Equipment
          </h2>
          <div className="bg-accent w-fit px-6 py-1 rounded-xl mx-2 my-2">
            {equipments}
          </div>
          <h2 className="text-textcolor text-2xl mt-5 border-b-2 border-bordercolor">
            Instructions
          </h2>
          {instructions.map((instruct, index) => (
              <div key={index} className="mx-2 my-2 font-normal text-textcolor">
                <div className="font-bold ">
                  Step {index + 1}
                </div>
                {instruct.replace(/^.*Step:\d+\s*/, "")}
              </div>
          ))}
          <div className="w-full flex justify-center items-center gap-4 pt-4">
            <button
                onClick={() => {
                navigate(-1);
                }}
                className="flex items-center justify-center h-12 px-6 rounded-full text-textcolor bg-accent hover:bg-accent-action"
            >
              Close
            </button>
            <button
                onClick={() => {
                  addExercise()
                }}
                className="flex items-center justify-center h-12 w-12 rounded-full bg-accent hover:bg-accent-action text-textcolor"
            >
              <AddIcon sx={{fontSize: 40}}/>
            </button>
          </div>
        </div>
      </div>
  );
}