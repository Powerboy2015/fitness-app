import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import WorkoutRouter from "./WorkoutRouter.tsx";
import {ROUTES} from "./routes.ts";


// to increase clarity, I added this s it's easier to see where the routes go to.
// only for use in this file
const APP_ROUTES = {
    HOME: "/",
    WORKOUT: `/workouts/*`,
} as const;

// This returns the routes a options for a type.
export type RouteName = typeof ROUTES[keyof typeof ROUTES];

export default function AppRouter(): React.ReactElement {
    return (
        <main className={'w-full h-full p-4 overflow-auto no-scrollbar bg-background'}>
            <Routes>
                <Route path={APP_ROUTES.HOME} element={<HomePage/>} />
                <Route path={APP_ROUTES.WORKOUT} element={<WorkoutRouter/>}/>
            </Routes>
        </main>
    );
}