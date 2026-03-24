use serde::Serialize;
use crate::api::{ApiError, ApiErrorResponse, ApiResponse};
use crate::interface::dto::{CreateWorkoutDTO, WorkoutListDTO, WorkoutRecordDTO};
use crate::repository::workout_repository::WorkoutRepository;

pub struct WorkoutService {
    workout: WorkoutRepository
}

impl WorkoutService {
    pub fn new(workout_repo: WorkoutRepository) -> Self {
        Self {
            workout: workout_repo
        }
    }

    pub fn list(&self) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
        //gets the raw records from the database
        let workout_records = self.workout.list().map_err(|e| ApiError::DatabaseError)?;

        //remap to DTO
        let workout_list: WorkoutListDTO = workout_records
            .iter()
            .map(|workout| WorkoutRecordDTO {
                uuid: workout.uuid.clone(),
                name: workout.name.clone(),
                desc: workout.desc.clone(),
            })
            .collect();

        // Return response
        Ok(ApiResponse {
            ok: true,
            data: workout_list,
        })
    }
    pub fn create(&self, create_workout_dto: CreateWorkoutDTO) -> Result<ApiResponse<String>, ApiErrorResponse> {
        let response = self.workout.create(create_workout_dto).map_err(|e| ApiError::DatabaseError)?;

        Ok(ApiResponse {
            ok: response,
            data: String::from("Workout has been created"),
        })
    }
}