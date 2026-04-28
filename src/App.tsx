import "./App.css";
import { BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar.tsx";
import { WorkoutProvider } from "./context/WorkoutContext";
// import FoodList from "./pages/FoodList.tsx"
// import Home from "./pages/Home.tsx";
// import WorkoutOverviewPage from "./pages/WorkoutOverviewPage.tsx";
// import EditWorkout from "./pages/EditWorkout.tsx";
// import AddExercises from "./pages/AddExercises.tsx";
// import Session from "./pages/Session.tsx";
// import NewWorkout from "./pages/NewWorkout.tsx";
// import Profile from "./pages/Profile.tsx";
// import WorkoutHistory from "./pages/WorkoutHistory.tsx";
// import SessionHistory from "./pages/SessionHistory.tsx";
// import KcalTracker from "./pages/KcalTracker.tsx";
// import WorkoutDetailPage from "./pages/WorkoutDetailPage.tsx";
// import ExerciseDescription from "./pages/ExerciseDescription.tsx";
// import ProductDetails from "./pages/ProductDetails.tsx";
import { Toaster } from "react-hot-toast";
import FloatingWorkoutTimer from "./components/FloatingWorkoutTimer.tsx";
import useWorkoutOverlayCloser from "./Hooks/useWorkoutOverlayCloser.ts";
import AppRoutes from "./components/routers/AppRoutes.tsx";

function App() {
    useWorkoutOverlayCloser();

  return (
    <WorkoutProvider>
      <BrowserRouter>
        <div className="h-dvh flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto no-scrollbar">
            <Toaster position="top-center" reverseOrder={false} />
            {/*<Routes>*/}
            {/*  <Route path="/edit-workout" element={<EditWorkout />} />*/}
            {/*  <Route path="/add-exercises" element={<AddExercises />} />*/}
            {/*  <Route path="/session" element={<Session />} />*/}
            {/*  <Route path="/new-workout" element={<NewWorkout />} />*/}
            {/*  <Route path="/history" element={<WorkoutHistory />} />*/}
            {/*  <Route path="/session-history" element={<SessionHistory />} />*/}
            {/*  <Route path="/exercises" element={<WorkoutDetailPage />} />*/}
            {/*  <Route path="/food-list" element={<FoodList />} />*/}
            {/*  <Route path="/exercise-description"element={<ExerciseDescription />}/>*/}
            {/*  <Route path="/product-details" element={<ProductDetails />} />*/}
            {/*</Routes>*/}
            <AppRoutes/>
          </main>
          <FloatingWorkoutTimer />
          <BottomNavBar />
        </div>
      </BrowserRouter>
    </WorkoutProvider>
  );
}

export default App;
