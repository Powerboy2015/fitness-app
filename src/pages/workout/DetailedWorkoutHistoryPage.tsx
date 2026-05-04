import {useParams} from "react-router-dom";

export default function DetailedWorkoutHistoryPage() {
    const params = useParams();
    const id = params.id ?? "";
    return<div className={"flex w-full h-full flex-col p-4 overflow-y-scroll no-scrollbar"}>{id}</div>
}