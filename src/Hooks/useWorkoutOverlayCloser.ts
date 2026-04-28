import API from "../classes/api.ts";
import {SESSION_STORAGE_KEYS} from "../apis/sessionAPI.ts";
import {useEffect} from "react";


/**
 * When closing the app, checks if a current session is active, if there is, it saves it and closes the app.
 *
 * Otherwise, throws an error and prevents the app from closing.
 */
export default function useWorkoutOverlayCloser() {
    useEffect(() => {
        let unlistenCloseRequested: (() => void) | undefined;
        let isClosing = false;

        /**
         * if a session is active, completes the active session on close.
         */
        const finishActiveWorkout = async () => {
            if (!localStorage.getItem(SESSION_STORAGE_KEYS.id)) return;

            try {
                await API.session.complete();
            } catch (error) {
                console.error("Failed to auto-complete workout on app close", error);
            }
        };

        const handleBeforeUnload = () => {
            void finishActiveWorkout();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        const registerTauriCloseHook = async () => {
            // Checks if the app is running in tauri.
            const isTauriRuntime = "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
            if (!isTauriRuntime) return;

            try {
                // gets current app window from tauri API.
                const { getCurrentWindow } = await import("@tauri-apps/api/window");
                const appWindow = getCurrentWindow();

                // Waits until an close the window Events fires AKA you close your app
                unlistenCloseRequested = await appWindow.onCloseRequested(async (event) => {
                    if (isClosing) return;

                    // prevents closing the window.
                    event.preventDefault();
                    isClosing = true;
                    // Finishes workout, then closes app.
                    await finishActiveWorkout();
                    await appWindow.close();
                });
            } catch (error) {
                console.error("Failed to register Tauri close handler", error);
            }
        };

        // ????
        void registerTauriCloseHook();

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            unlistenCloseRequested?.();
        };
    }, []);
}