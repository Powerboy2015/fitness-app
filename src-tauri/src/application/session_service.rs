use tauri::webview::cookie::time::UtcDateTime;
use uuid::Uuid;
use crate::api::{ApiError, ApiErrorResponse};
use crate::domain::{Session, SessionExercise, Set, WorkoutExerciseRepo};
use crate::repository::workout_exercise_repository::WorkoutExerciseRepository;

pub struct SessionService {
    current_session: Option<Session>,
    workout_exercise: WorkoutExerciseRepository
}

impl SessionService {
    pub fn new(workout_exercise: WorkoutExerciseRepository) -> Self {
        Self{
            current_session: None,
            workout_exercise
        }
    }

    pub fn get_session(&self) -> Option<Session> {
        self.current_session.clone()
    }

    pub fn start_session(&mut self, workout_id: String) -> Result<String,ApiErrorResponse> {
        //gets detailed workout
        let workout_details = self.workout_exercise.get_detailed(&workout_id).map_err(|_|ApiError::DatabaseError)?;

        // map exercises to vector of sessionExercises
        let session_exercises = workout_details
            .exercises
            .into_iter()
            .map(|exercise| {
            SessionExercise {
                exercise_id: exercise.exercise_id,
                name: exercise.name,
                gif_url:exercise.gif_url,
                sets: instantiate_sets(exercise.body_parts)
            }
        }).collect();

        // create new SessionObject
        let session_uuid = Uuid::new_v4().to_string();
        let session = Session{
            session_uuid: session_uuid.clone(),
            workout_uuid: workout_details.uuid,
            workout_name: workout_details.name,
            start_time:  UtcDateTime::now().to_string(),
            end_time: String::new(),
            exercises: session_exercises
        };

        // set new Session Object
        self.current_session = Some(session);

        // return session_uuid
        Ok(session_uuid)
    }
}

fn instantiate_sets(body_part: String) -> Vec<Set> {
    let mut sets: Vec<Set> = Vec::new();
    // #TODO get the total count from new field in database.

    if body_part.contains("cardio")
    {
        for _i in 0..1 {
            sets.push(Set::Timed {
                distance: 0f64,
                time: 0.0,
                time_completed: String::new()
            });
        }
    } else {
        for _i in 0..3 {
            sets.push(Set::Weighted {
                reps: 0,
                weight: 0.0,
                time_completed: String::new()
            });
        }
    }

    sets
}