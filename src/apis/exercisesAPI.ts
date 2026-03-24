import { ApiClient } from "../classes/api";
import {muscleGroups} from "../Hooks/UseMuscleFilters.ts";

export default class ExercisesAPI {
    // TODO broken after main import, gotta fix
    // public async create(_name: string, _desc?: string) {
    //     if (!_name) {
    //         const err = "workout requires username";
    //         console.error(err);
    //         return err;
    //     }

    //     const exercise: ExerciseDTO = {
    //         name: _name,
    //         desc: _desc,
    //     };
    //     const result = await ApiClient.send<string>("create_exercise", { exercise });
    //     return ApiClient.assertOk(result);
    // }

    public async list(): Promise<ExerciseDTO[]> {
        const result = await ApiClient.send<ExerciseDTO[]>("get_all_exercises");
        return ApiClient.assertOk(result);
    }

    public async filter(muscle: muscleGroups): Promise<ExerciseDTO[]> {
        const result = await ApiClient.send<ExerciseDTO[]>("get_exercises_by_muscle",{muscleId: muscle});
        return ApiClient.assertOk(result);
    }
}
