use tauri::State;
use crate::api::{ApiErrorResponse, ApiResponse};
use crate::application::workout_service::CreateWorkoutRequest;
use crate::interface::dto::{CreateWorkoutDTO, ExerciseListDTO, ExerciseRecordDTO, WorkoutDTO, WorkoutsDTO};
use crate::Ctx;

#[tauri::command]
pub fn list_workouts(ctx: State<Ctx>) -> Result<ApiResponse<WorkoutsDTO>, ApiErrorResponse> {
    let workouts = ctx.service.workout.list_workouts()?;

    //remap to DTO
    let workout_list: WorkoutsDTO = workouts
        .into_iter()
        .map(WorkoutDTO::from)
        .collect();

    // Return response
    Ok(ApiResponse {
        ok: true,
        data: workout_list,
    })
}

#[tauri::command]
pub fn create_workout(ctx: State<Ctx>,req: CreateWorkoutDTO) -> Result<ApiResponse<String>, ApiErrorResponse> {
    let req = CreateWorkoutRequest {
        uuid: req.uuid,
        name: req.name,
        desc: Option::from(req.desc).expect("Option broke in create_workout"),
        exercises: None,
    };

    let id = ctx.service.workout.create_workout(req)?;

    Ok(ApiResponse {
        ok: true,
        data: id,
    })
}

#[tauri::command]
pub fn create_workout_with_exercises(ctx: State<Ctx>, req: CreateWorkoutRequest) -> Result<ApiResponse<String>, ApiErrorResponse> {

    let response = ctx.service.workout.create_workout_with_exercises(req)?;

    Ok(ApiResponse {
        ok: true,
        data: response
    })
}

#[tauri::command]
pub fn get_all_exercises(ctx: State<Ctx>) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
    let resp = ctx.service.workout.list_exercises()?;

    let data: ExerciseListDTO = resp
        .into_iter()
        .map(ExerciseRecordDTO::from)
        .collect();

    Ok(ApiResponse {
        ok: true,
        data
    })
}

#[tauri::command]
pub fn get_exercises_by_muscle(ctx: State<Ctx>, req: String) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
    let resp = ctx.service.workout.filter_exercises(req)?;

    let data: ExerciseListDTO = resp
        .into_iter()
        .map(ExerciseRecordDTO::from)
        .collect();

    Ok(ApiResponse {
        ok: true,
        data
    })
}

#[tauri::command]

pub fn get_workout(ctx: State<Ctx>,req: String) -> Result<ApiResponse<WorkoutDTO>, ApiErrorResponse> {
    let detailed_workout = ctx.service.workout.get_detailed_workout(req)?;

    Ok(ApiResponse {
        ok:true,
        data: WorkoutDTO::from(detailed_workout),
    })
}