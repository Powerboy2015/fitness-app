import {ExerciseSet, ExerciseSetUpdate} from "../../types/types.ts";
import {useEffect, useState} from "react";
import {parseNumberInput} from "../../types/Helpers.ts";

interface SetItemProps{
    set: ExerciseSet;
    onChange: (updated: ExerciseSetUpdate) => void;
}

/**
 * The merge element for both the weighted and the timed set.
 * Contains both elements below
 *
 * @param param0
 * @param param0.set
 * @constructor
 */
export default function SetItem({  set, onChange}: SetItemProps) {

    if (set.type === "Weighted") {
        return <div className={"set flex flex-col gap-1"}>
            <WeightedSet weight={set.weight.toString()}
                         reps={set.reps}
                         onChange={
                    (reps,weight) => onChange({...set,reps,weight: Number(weight)})
                }
            />
        </div>
    }


    const setType = (set.type == "Weighted") ?  : <TimedSet/>
    return <div className={"set flex flex-col gap-1"}>
        {setType}
    </div>
}

interface WeightedSetProps {
    reps: number;
    weight: string;
    onChange: (reps: number, weight: string) => void;
}

function WeightedSet({reps, weight, onChange}:WeightedSetProps) {
    return (
        <div className="flex flex-col gap-2">

            <div className="flex items-center justify-between">
                <label>reps:</label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        onChange(val, weight);
                    }}
                />
            </div>

            <div className="flex items-center justify-between">
                <label>weight:</label>
                <input
                    type="text"
                    value={weight}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) {
                            onChange(reps, val);
                        }
                    }}
                />
            </div>

        </div>
    );
}

function TimedSet() {
    // TODO FINISH, just an example
    return <div>Timed</div>
}