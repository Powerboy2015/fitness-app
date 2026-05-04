import {Routes, Route, Outlet} from "react-router-dom";
import WorkoutOverviewPage from "../../pages/workout/WorkoutOverviewPage.tsx";
import {WorkoutDetailPage} from "../../pages/workout/WorkoutDetailPage.tsx";
import CreateWorkoutPage from "../../pages/workout/CreateWorkoutPage.tsx";
import {useEffect, useState} from "react";
import {Iworkout} from "../../context/WorkoutContext.tsx";
import ExerciseOverviewPage from "../../pages/exercises/ExerciseOverviewPage.tsx";
import ExerciseDescription from "../../pages/exercises/ExerciseDescription.tsx";
import useScroll from "../../Hooks/useScroll.ts";

const ROUTES = {
    LIST: "/",
    DETAILED: "/:id", //<------------- by using :id, we can get the param using useParams()
    CREATE: "/create",
    EXERCISES: "/create/exercises",
    EXERCISE_DETAILS: "/create/exercises/:id"
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
// Think of it as useContext, but without having it accessible everywhere.
// https://reactrouter.com/api/hooks/useOutletContext
function CreateWorkoutDataHolder() {
    const [tempWorkout,setTempWorkout] = useState<createWorkoutObj>({name:"",desc:"",exercises:[]});

    //Really hacky way to reset the scroll whenever you leave the whole workout create routes.
    const {resetScroll} = useScroll("exerciseScrollSaver");

    useEffect(() => {
        console.log("MOUNT CreateWorkoutDataHolder");

        return () => {
            console.log("UNMOUNT CreateWorkoutDataHolder");
            resetScroll();
        }
    }, []);

    return<>
        <Outlet context={{tempWorkout,setTempWorkout}}/>
    </>
}

export default function WorkoutRoutes() {
    return <Routes>
        <Route path={ROUTES.LIST} element={<WorkoutOverviewPage/>} />
        <Route path={ROUTES.DETAILED} element={<WorkoutDetailPage/>} />


        {/*TODO I might want to find a way to refactor this and bring back overlays. This is functional, and might not need a refactor.*/}
        <Route path={ROUTES.CREATE} element={<CreateWorkoutDataHolder/>}>
            <Route index element={<CreateWorkoutPage/>} />
            <Route path={ROUTES.EXERCISES} element={<ExerciseOverviewPage/>} />
            <Route path={ROUTES.EXERCISE_DETAILS} element={<ExerciseDescription/>} />
        </Route>

    </Routes>
}