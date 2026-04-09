import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check"
import { invoke } from "@tauri-apps/api/core";
import { MouseEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExerciseDescriptionOverlay({
  name,
  id,
  gif,
  onSelect,
  selected
}: {
  name: string;
  id: string;
  gif: string;
  onSelect: () => void;
  selected: boolean
}) {
  const [equipments, setEquipments] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [targetMuscle, setTargetMuscle] = useState<string[]>([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [added,isAdded] = useState<boolean>(false);


  interface ExerciseResponse {
    data: {
      gif_url: string;
      equipments: string;
      instructions: string;
      secondary_muscles: string;
      target_muscles: string;
    };
    ok: boolean;
  }
  async function getExerciseById() {
    if (id !== "") {
      try {
        const res = await invoke<ExerciseResponse>("get_exercise_by_id", {
          exerciseId: id,
        });
        setEquipments(JSON.parse(res.data.equipments));
        setInstructions(JSON.parse(res.data.instructions));
        setSecondaryMuscles(JSON.parse(res.data.secondary_muscles));
        setTargetMuscle(JSON.parse(res.data.target_muscles));
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    }
  }

  function handleToggleClick() {
    setToggle(!toggle);
    getExerciseById();
  }

  function handleAddClick() {
    setToggle(false);
    onSelect();
  }


  //Handles save click, adds to list and sets checkmark for a second.
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!onSelect || added) return;
    onSelect();
    isAdded(true);

    setTimeout(() => {
      isAdded(false);
    },2000);
  }

  return (
    <div>
      <li
        className={`bg-[#1E1E1E] ${selected ? "border-[#F67631]" : "border-[#414141]"} border rounded-xl px-2 mb-3 flex w-[90%] items-center mx-auto hover:bg-[#252525] active:bg-[#252525] cursor-pointer mt-2`}
      >
        <div
          className="flex w-full h-full py-4 items-center justify-between"
          onClick={() => handleToggleClick()}
        >
          <img
            className="h-20 w-20 contain-content rounded-xl"
            src={gif}
            alt=""
          />
          <h2 className="text-lg ml-5 font-semibold">{name}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
            className="flex h-12 w-12 rounded-full bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] ml-2 z-50">
            {!added ? <AddIcon sx={{ fontSize: 49 }} /> : <CheckIcon sx={{ fontSize: 49 }} />}
            </button>
        </div>
      </li>
      <Overlay
      active={toggle}
      name={name}
      gif={gif}
      targetMuscle={targetMuscle}
      secondaryMuscles={secondaryMuscles}
      equipments={equipments}
      instructions={instructions}
      handleAddClick={handleAddClick}
      disableOverlay={() =>{setToggle(false)}}
      />
    </div>
  );
}


interface OverlayProps {
  active: boolean;
  name: string;
  gif: string;
  targetMuscle: string[];
  secondaryMuscles: string[];
  equipments: string[];
  instructions: string[];
  handleAddClick: () => void;
  disableOverlay: () => void;
}
function Overlay({active,name,gif,targetMuscle,secondaryMuscles,equipments,instructions,handleAddClick,disableOverlay}:OverlayProps): ReactElement {
  
  if (!active) return <></>;

  return <div>
        <div className="flex w-screen fixed top-0 bottom-0 bg-[#1E1E1E] z-10000 overflow-scroll">
          <div className="grid grid-cols-2 gap-4 py-4 w-[90%] h-[210%] mx-auto">
            <div className="col-span-2 bg-[#1E1E1E] border border-[#414141] rounded-xl p-6 font-bold flex flex-col ">
              <h2 className="font-bold text-[#F2F3F2] text-2xl  mb-2 border-b-2 border-[#414141] w-[90%] flex mx-auto">
                <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
              </h2>
              <img src={gif} alt="" />

              <h2 className="font-bold text-[#F2F3F2] text-2xl  mb-2 border-b-2 border-[#414141] w-[90%] flex mx-auto mt-5">
                Targeted muscles:
              </h2>
              <div className="bg-[#F67631] w-fit px-9 py-1 rounded-xl mx-2 my-1 self-center">
                {targetMuscle}
              </div>
              <div className="grid grid-cols-2 text-center">
                {secondaryMuscles.map((muscle, index) => {
                  return (
                    <div
                      key={index}
                      className="border-[#F67631] border px-5 text-xs py-1 rounded-xl max-w-full mx-2 my-1 "
                    >
                      {muscle}
                   </div>
                  );
                })}
              </div>
              <h2 className="font-bold text-[#F2F3F2] text-2xl  mb-2 border-b-2 border-[#414141] w-[90%] flex mx-auto mt-5">
                Equipment
              </h2>
              <div className="bg-[#F67631] w-fit px-9 py-1 rounded-xl mx-2 my-1">
                {equipments}
              </div>
              <h2 className="font-bold text-[#F2F3F2] text-2xl  mb-2 border-b-2 border-[#414141] w-[90%] flex mx-auto mt-5">
                Instructions
              </h2>
              {instructions.map((instruct, index) => {
                return (
                  <div
                    key={index}
                    className=" self-start w-fit px-3 rounded-xl mx-2 my-1 font-normal"
                  >
                    <div className="font-bold">Step {index + 1}</div>
                    {instruct.replace(/^.*Step:\d+\s*/, "")}
                  </div>
                );
              })}
              <div className="flex  justify-center ">
                <button className="p-5" onClick={() => disableOverlay()}>
                  close
                </button>
                <button
                  onClick={() => handleAddClick()}
                  className="flex h-12 w-12 rounded-full bg-[#F67631] hover:bg-[#FF9962] active:bg-[#FF9962] ml-2"
                >
                  <AddIcon sx={{ fontSize: 49 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>;
}