import { ApiClient } from "../classes/api";

interface createWorkoutInput {
    name:string;
    desc?:string;
    exercises?: string[];
}

export default class workoutAPI {
    public async create(dto: createWorkoutInput): Promise<string> {
        if (!dto.name.trim()) {
            const errMessage = "Workout requires a name"
            console.error(errMessage);
            return errMessage;
        }

        let result: ApiError | ApiSucess<string>;
        if (!dto.exercises) {
            const request = {
                uuid: "",
                name: dto.name,
                desc: dto.desc,

            };
            result = await ApiClient.send<string>("create_workout", { request });
        } else {
            const request = {
                uuid: "",
                name: dto.name,
                desc: dto.desc,
                exercises: dto.exercises
            };
            result = await ApiClient.send<string>("create_workout_with_exercises",{ request });

        }
        return ApiClient.assertOk(result);
    }



    public async list(): Promise<Array<WorkoutDTO>> {
        const result = await ApiClient.send<WorkoutDTO[]>("list_workouts");
        return ApiClient.assertOk(result);
    }

    public async linkExercise(_workoutID: string, _exerciseID: string) {
        const linkExercise: linkExerciseDTO = {
            workout_uuid: _workoutID,
            exercise_uuid: _exerciseID,
        };

        const result = await ApiClient.send<string>("link_exercise", { linkExercise });
        return ApiClient.assertOk(result);
    }

    /**
     *  Gets a workout with it's connected exercises based on the provided Uuid.
     * @param _workoutID The Uuid provided from the backend list.
     * @returns a detailed list of workout information and connected exercises.
     */
    public async detailed(_workoutUuid: string): Promise<IdetailedWorkoutDTO | string> {
        if (!_workoutUuid) {
            const err = "workout requires username";
            console.error(err);
            return err;
        }

        const resp = await ApiClient.send<IdetailedWorkoutDTO>("get_workout", { request: _workoutUuid });
        return ApiClient.assertOk(resp);
    }
}
