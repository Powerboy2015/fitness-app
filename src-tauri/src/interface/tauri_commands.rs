use tauri::State;
use crate::api::{ApiErrorResponse, ApiResponse};
use crate::Ctx;
use crate::interface::dto::{CreateWorkoutDTO, WorkoutListDTO, WorkoutRecordDTO};

#[tauri::command]
pub fn list_workouts(ctx: State<Ctx>) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
    ctx.service.workout.list()
}

#[tauri::command]
pub fn create_workout(ctx: State<Ctx>,create_workout_dto: CreateWorkoutDTO) -> Result<ApiResponse<String>, ApiErrorResponse> {
    ctx.service.workout.create(create_workout_dto)
}