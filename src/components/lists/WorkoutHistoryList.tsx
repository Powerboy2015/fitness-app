import {useEffect, useMemo, useState} from "react";
import API from "../../classes/api.ts";
import ComponentContainer from "../ui/ComponentContainer.tsx";

export default function WorkoutHistoryList() {
    const [historyList,setHistoryList] = useState<IworkoutHistory[]>([]);

    useEffect(()=>{
        API.workouts.history().then((resp) => {
            setHistoryList(resp);
        })
    },[])

    const historyElements = useMemo(() => {
        return historyList.map(workout => <WorkoutHistoryItem workoutData={workout}/>)
    },[historyList])

    return <>
        <div id={"WorkoutHistoryList"} className={"flex-col flex gap-4"}>
        {historyElements}
        </div>
    </>
}


interface WorkoutHistoryItemProps {
    workoutData: IworkoutHistory
}
function WorkoutHistoryItem({workoutData}:WorkoutHistoryItemProps) {
    return<>
        <ComponentContainer>
            <div className="text-left cursor-pointer mb-auto">
                <h2 className="text-lg font-semibold text-textcolor">{workoutData.workoutName}</h2>
            </div>
            <p className="text-sm text-muted leading-tight">{`${workoutData.startDate.getDate()}-${workoutData.startDate.getMonth()}-${workoutData.startDate.getFullYear()}`}</p>
            <p className="text-sm text-muted leading-tight">{`${workoutData.startDate.getHours()}:${workoutData.startDate.getMinutes()} - ${workoutData.endDate.getHours()}:${workoutData.endDate.getMinutes()}`}</p>
        </ComponentContainer>

    </>
}