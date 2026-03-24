use serde::Serialize;
use crate::api::{ApiError, ApiErrorResponse, ApiResponse};
use crate::interface::dto::{CreateWorkoutDTO, ExerciseListDTO, ExerciseRecordDTO, WorkoutListDTO, WorkoutRecordDTO};
use crate::repository::exercise_repository::ExerciseRepository;
use crate::repository::workout_repository::WorkoutRepository;

pub struct WorkoutService {
    workout: WorkoutRepository,
    exercises: ExerciseRepository
}

impl WorkoutService {
    pub fn new(workout_repo: WorkoutRepository, exercise_repository: ExerciseRepository) -> Self {
        Self {
            workout: workout_repo,
            exercises: exercise_repository
        }
    }

    pub fn list_workouts(&self) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
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
    pub fn list_exercises(&self) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
        let exercise_records = self.exercises.list().map_err(|e| { 
            println!("{:?}", e);
            ApiError::DatabaseError
        })?;
        
        let exercise_list: ExerciseListDTO = exercise_records
            .iter()
            .map(|exercise| ExerciseRecordDTO {
                exercise_id: exercise.exercise_id.clone(),
                name: exercise.name.clone(),
                gif_url: exercise.gif_url.clone(),
                target_muscles: exercise.target_muscles.clone(),
                body_parts: exercise.body_parts.clone(),
                equipments: exercise.equipments.clone(),
                secondary_muscles: exercise.secondary_muscles.clone(),
                instructions: exercise.instructions.clone().unwrap_or_else(|| "empty instructions".into())
            })
            .collect();

        Ok(ApiResponse {
            ok: true,
            data: exercise_list,
        })
    }
    
    pub fn create_workout(&self, create_workout_dto: CreateWorkoutDTO) -> Result<ApiResponse<String>, ApiErrorResponse> {
        let response = self.workout.create(create_workout_dto).map_err(|e| ApiError::DatabaseError)?;

        Ok(ApiResponse {
            ok: response,
            data: String::from("Workout has been created"),
        })
    }
}