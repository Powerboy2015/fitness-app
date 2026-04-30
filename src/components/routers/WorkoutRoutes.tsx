import {Routes, Route, Outlet} from "react-router-dom";
import WorkoutOverviewPage from "../../pages/workout/WorkoutOverviewPage.tsx";
import {WorkoutDetailPage} from "../../pages/workout/WorkoutDetailPage.tsx";
import CreateWorkoutPage from "../../pages/workout/CreateWorkoutPage.tsx";
import ExerciseOverviewPage from "../../pages/workout/ExerciseOverviewPage.tsx";
import {useEffect, useState} from "react";
import {Iworkout} from "../../context/WorkoutContext.tsx";

const ROUTES = {
    LIST: "/",
    DETAILED: "/:id", //<------------- by using :id, we can get the param using useParams()
    CREATE: "/create",
    EXERCISES: "/create/exercises"
}

interface createWorkoutObj {
    name: string,
    desc: string,
    exercises: Iworkout[],
}

export interface WorkoutOutletContext {
    tempWorkout: createWorkoutObj;
    setTempWorkout:  React.Dispatch<React.SetStateAction<createWorkoutObj>>;
}
// here we store the data for the create-workout stuff.
// By doing it here, it allows us to keep the data only relevant for the pages that makes use of it.
// https://reactrouter.com/api/hooks/useOutletContext
function CreateWorkoutDataHolder() {
    const [tempWorkout,setTempWorkout] = useState<createWorkoutObj>({name:"",desc:"",exercises:[]});
    useEffect(() => {
        console.log("MOUNT CreateWorkoutDataHolder");

        return () => console.log("UNMOUNT CreateWorkoutDataHolder");
    }, []);

    return<>
        <Outlet context={{tempWorkout,setTempWorkout}}/>
    </>
}

export default function WorkoutRoutes() {
    return <Routes>
        <Route path={ROUTES.LIST} element={<WorkoutOverviewPage/>} />
        <Route path={ROUTES.DETAILED} element={<WorkoutDetailPage/>} />

        <Route path={ROUTES.CREATE} element={<CreateWorkoutDataHolder/>}>
            <Route index element={<CreateWorkoutPage/>} />
            <Route path={ROUTES.EXERCISES} element={<ExerciseOverviewPage/>} />
        </Route>

    </Routes>
}