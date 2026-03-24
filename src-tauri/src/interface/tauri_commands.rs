use tauri::State;
use crate::api::{ApiErrorResponse, ApiResponse};
use crate::Ctx;
use crate::interface::dto::{CreateWorkoutDTO, ExerciseListDTO, WorkoutListDTO, WorkoutRecordDTO};

#[tauri::command]
pub fn list_workouts(ctx: State<Ctx>) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
    ctx.service.workout.list_workouts()
}

#[tauri::command]
pub fn create_workout(ctx: State<Ctx>,create_workout_dto: CreateWorkoutDTO) -> Result<ApiResponse<String>, ApiErrorResponse> {
    ctx.service.workout.create_workout(create_workout_dto)
}

#[tauri::command]
pub fn get_all_exercises(ctx: State<Ctx>) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
    ctx.service.workout.list_exercises()
}