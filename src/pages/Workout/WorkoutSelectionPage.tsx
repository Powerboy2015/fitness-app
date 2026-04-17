import UseWorkouts from "../../Hooks/UseWorkouts.ts";
import WorkoutItem from "../../components/items/WorkoutItem.tsx";
import {useMemo} from "react";
import API from "../../classes/api.ts";
import LinkButton from "../../components/ui/LinkButton.tsx";
import {ROUTES} from "../../router/routes.ts";

export default function WorkoutSelectionPage(): React.ReactElement {
    const {workouts ,reloadWorkouts} = UseWorkouts();

    const handleDelete = async (id: string) => {
        await API.workouts.remove(id);
        reloadWorkouts();
    }

    const workoutList = useMemo(() => {
        return workouts.map((workout,idx) => <WorkoutItem key={idx} workoutObj={workout} onDelete={handleDelete}/>)
    },[workouts]);

    return<div className={"flex flex-col w-full h-full gap-3"}>
        <div id={"workoutList"} className={"w-full h-full overflow-y-scroll no-scrollbar flex flex-col gap-4"}>
        {workoutList}
        </div>
        <LinkButton to={ROUTES.WORKOUT_CREATE}>Create Workout</LinkButton>
    </div>
}