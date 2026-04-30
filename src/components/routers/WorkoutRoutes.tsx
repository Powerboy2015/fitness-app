import {Routes, Route} from "react-router-dom";
import WorkoutOverviewPage from "../../pages/workout/WorkoutOverviewPage.tsx";
import {WorkoutDetailPage} from "../../pages/workout/WorkoutDetailPage.tsx";
import CreateWorkoutPage from "../../pages/workout/CreateWorkoutPage.tsx";

const ROUTES = {
    LIST: "/",
    DETAILED: "/:id", //<------------- by using :id, we can get the param using useParams()
    CREATE: "/create"
}

export default function WorkoutRoutes() {
    return <Routes>
        <Route path={ROUTES.LIST} element={<WorkoutOverviewPage/>} />
        <Route path={ROUTES.DETAILED} element={<WorkoutDetailPage/>} />
        <Route path={ROUTES.CREATE} element={<CreateWorkoutPage/>} />
    </Routes>
}