import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import WorkoutHistoryPage from "../pages/WorkoutHistoryPage.tsx";
import WorkoutSelectionPage from "../pages/WorkoutSelectionPage.tsx";


// This is an enum, we can use ROUTES.HOME, which is just a "/".
export const ROUTES = {
    HOME: '/',
    WORKOUT_HISTORY: '/workouts/history',
    WORKOUT_SELECT: '/workouts/'
} as const;

// This returns the routes a options for a type.
export type RouteName = typeof ROUTES[keyof typeof ROUTES];

export default function AppRouter(): React.ReactElement {
    return (
        <main className={'w-full h-full p-4 overflow-auto no-scrollbar bg-background'}>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage/>} />
                <Route path={ROUTES.WORKOUT_HISTORY} element={<WorkoutHistoryPage/>} />
                <Route path={ROUTES.WORKOUT_SELECT} element={<WorkoutSelectionPage/>} />
            </Routes>
        </main>
    );
}