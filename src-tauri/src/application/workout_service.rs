use uuid::Uuid;
use crate::api::{ApiError, ApiErrorResponse, ApiResponse};
use crate::domain::Exercise::Exercise;
use crate::interface::dto::{CreateWorkoutDTO, CreateWorkoutInput, DetailedWorkoutDTO, ExerciseListDTO, ExerciseRecordDTO, WorkoutListDTO, WorkoutRecordDTO};
use crate::repository::exercise_repository::ExerciseRepository;
use crate::repository::workout_exercise_repository::WorkoutExerciseRepository;
use crate::repository::workout_repository::WorkoutRepository;

pub struct WorkoutService {
    workout: WorkoutRepository,
    exercises: ExerciseRepository,
    workout_exercises: WorkoutExerciseRepository
}

impl WorkoutService {

    pub fn new(workout_repo: WorkoutRepository, exercise_repository: ExerciseRepository, workout_exercise_repository: WorkoutExerciseRepository) -> Self {
        Self {
            workout: workout_repo,
            exercises: exercise_repository,
            workout_exercises: workout_exercise_repository
        }
    }
    
    // gets the workout and connected exercises and maps it.
    pub fn get_detailed_workout(&self,workout_id: String) -> Result<ApiResponse<DetailedWorkoutDTO>,ApiErrorResponse> {
        let record = self.workout_exercises.get_detailed(&workout_id).map_err(|_| ApiError::DatabaseError)?;

        // Remapping exercises to the DTO.
        let exercise_list = record.exercise.iter().map(|exercise| {
            ExerciseRecordDTO {
                exercise_id: exercise.exercise_id.clone(),
                name: exercise.name.clone(),
                gif_url: exercise.gif_url.clone(),
                target_muscles: exercise.target_muscles.clone(),
                body_parts: exercise.body_parts.clone(),
                equipments: exercise.equipments.clone(),
                secondary_muscles: exercise.secondary_muscles.clone(),
                instructions: exercise.instructions.clone().unwrap_or_else(||"".to_string())
            }
        });

        let dto = DetailedWorkoutDTO {
            uuid: record.workout.uuid,
            name: record.workout.name,
            desc: record.workout.desc.unwrap_or_else(|| "".to_string()),
            exercises: exercise_list.collect(),
        };

        Ok(ApiResponse {
            ok: true,
            data: dto,
        })
    }

    pub fn list_workouts(&self) -> Result<ApiResponse<WorkoutListDTO>, ApiErrorResponse> {
        //gets the raw records from the database
        let workout_records = self.workout.list().map_err(|_| ApiError::DatabaseError)?;

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

        let exercise_list: ExerciseListDTO = records_to_dto(exercise_records).map_err(|_| ApiError::DatabaseError)?;

        Ok(ApiResponse {
            ok: true,
            data: exercise_list,
        })
    }

    pub fn filter_exercises(&self,muscle_group: String) -> Result<ApiResponse<ExerciseListDTO>, ApiErrorResponse> {
        let filtered_exercises = self.exercises.filtered_list(&muscle_group).map_err(|_| ApiError::DatabaseError)?;

        let exercise_list: ExerciseListDTO = records_to_dto(filtered_exercises).map_err(|_| ApiError::DatabaseError)?;

        Ok(ApiResponse {
            ok: true,
            data: exercise_list,
        })
    }

    pub fn create_workout(&self, create_workout_dto: CreateWorkoutInput) -> Result<ApiResponse<String>, ApiErrorResponse> {
        let uuid = Uuid::new_v4().to_string();
        let workout_dto = CreateWorkoutDTO {
            uuid: uuid.clone(),
            name: create_workout_dto.name,
            desc: create_workout_dto.desc.unwrap_or_else(||"".to_string()),
        };

        let response = self.workout.create(workout_dto).map_err(|_| ApiError::DatabaseError)?;

        Ok(ApiResponse {
            ok: response,
            data: uuid.to_string(),
        })
    }

    //creates a new workout with exercises if there are any.
    pub fn create_workout_with_exercises(&self, create_workout_dto: CreateWorkoutInput) -> Result<ApiResponse<String>, ApiErrorResponse> {
        // creates the list of exercises if they are there.
        // otherwise returns invalidInput error early.
        let exercises = create_workout_dto
            .exercises
            .clone()
            .ok_or(ApiError::InvalidInput)?;

        let response = self.create_workout(create_workout_dto.clone()).map_err(|_| ApiError::DatabaseError)?;

        self.workout_exercises.link(response.data, exercises.clone()).map_err(|e| {
            println!("{:?}", e);
            ApiError::DatabaseError
        })?;

        Ok(ApiResponse {
            ok: true,
            data: "workout Created".to_string(),
        })
    }
}

// This function converts the incoming exerciseRows from the database into DTO's
// Current there is not change, but if there's ever a day in which we decide to drop these, we can :)
fn records_to_dto(rows: Vec<Exercise>) -> Result<ExerciseListDTO, ApiErrorResponse> {
    let remapped = rows
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

    Ok(remapped)
}