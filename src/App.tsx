import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import AppUi from "./components/ui/AppUi.tsx";
import AppRouter from "./router/AppRouter.tsx";

function App() {
  return (
    <WorkoutProvider>
          <BrowserRouter>
              <Toaster position="top-center" reverseOrder={false} />
              <AppUi>
                  <AppRouter/>
              </AppUi>
          </BrowserRouter>
    </WorkoutProvider>
  );
}

export default App;