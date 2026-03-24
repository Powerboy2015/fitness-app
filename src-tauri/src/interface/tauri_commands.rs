use tauri::State;
use crate::api::{ApiErrorResponse, ApiResponse};
use crate::Ctx;
use crate::interface::dto::{ CreateWorkoutInput, ExerciseListDTO, WorkoutListDTO};

#[tauri::command]
pub fn list_workouts(ctx: State<Ctx>) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
    ctx.service.workout.list_workouts()
}

#[tauri::command]
pub fn create_workout(ctx: State<Ctx>,request: CreateWorkoutInput) -> Result<ApiResponse<String>, ApiErrorResponse> {
    ctx.service.workout.create_workout(request)
}

#[tauri::command]
pub fn create_workout_with_exercises(ctx: State<Ctx>, request: CreateWorkoutInput) -> Result<ApiResponse<String>, ApiErrorResponse> {
    ctx.service.workout.create_workout_with_exercises(request)
}

#[tauri::command]
pub fn get_all_exercises(ctx: State<Ctx>) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
    ctx.service.workout.list_exercises()
}

#[tauri::command]
pub fn get_exercises_by_muscle(ctx: State<Ctx>, request: String) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
    ctx.service.workout.filter_exercises(request)
}