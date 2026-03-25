use serde::{Deserialize, Serialize};
use crate::domain::{Exercise, Session, SessionExercise, Set, Workout};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutDTO {
    pub uuid: String,
    pub name: String,
    pub desc: Option<String>,
    pub exercises: ExerciseListDTO
}
impl From<Workout> for WorkoutDTO {
    fn from(w: Workout) -> Self {
        let exercises = w.exercises
            .into_iter()
            .map(ExerciseRecordDTO::from)
            .collect();

        WorkoutDTO {
            uuid: w.uuid,
            name: w.name,
            desc: w.desc,
            exercises
        }
    }
}

pub type WorkoutsDTO = Vec<WorkoutDTO>;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct CreateWorkoutDTO {
    pub uuid: String,
    pub name: String,
    pub desc: String,
    pub exercises: Option<Vec<String>>,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct ExerciseRecordDTO {
    pub exercise_id: String,
    pub name: String,
    pub gif_url: String,
    pub target_muscles: String,
    pub body_parts: String,
    pub equipments: String,
    pub secondary_muscles: String,
    pub instructions: String,
}
impl From<Exercise> for ExerciseRecordDTO {
    fn from(e: Exercise) -> Self {
        ExerciseRecordDTO {
            exercise_id: e.exercise_id ,
            name: e.name ,
            gif_url: e.gif_url ,
            target_muscles: e.target_muscles ,
            body_parts: e.body_parts ,
            equipments: e.equipments ,
            secondary_muscles: e.secondary_muscles ,
            instructions: e.instructions.unwrap_or_else(||"".to_string()),
        }
    }
}
pub type ExerciseListDTO = Vec<ExerciseRecordDTO>;

#[derive(Debug, Serialize, Deserialize,Clone)]
pub struct SessionDTO {
    pub session_uuid: String,
    pub workout_uuid: String,
    pub workout_name: String,
    pub start_time: String,
    pub end_time: String,
    pub exercises: Vec<SessionExerciseDTO>
}

impl From<Session> for SessionDTO {
    fn from(s: Session) -> Self {
        Self {
            session_uuid: s.session_uuid,
            workout_uuid: s.workout_uuid,
            workout_name: s.workout_name,
            start_time: s.start_time,
            end_time: s.end_time,
            exercises: s.exercises.into_iter().map(SessionExerciseDTO::from).collect()
        }
    }
}

#[derive(Debug, Serialize, Deserialize,Clone)]
pub struct SessionExerciseDTO {
    pub exercise_id: String,
    pub name: String,
    pub gif_url: String,
    pub sets: Vec<SetDTO>
}

impl From<SessionExercise> for SessionExerciseDTO {
    fn from(e: SessionExercise) -> Self {
        Self {
            exercise_id: e.exercise_id,
            name: e.name,
            gif_url: e.gif_url,
            sets: e.sets.into_iter().map(SetDTO::from).collect()
        }
    }
}

#[derive(Debug, Serialize, Deserialize,Clone)]
#[serde(tag = "type")]
pub enum SetDTO {
    Weighted {
        reps: i64,
        weight: f64,
        time_completed: String,
    },
    Timed {
        distance: f64,
        time: f64,
        time_completed: String,
    },
}

impl From<Set> for SetDTO {
    fn from(s: Set) -> Self {
        match s {
            Set::Weighted {
                reps,
                weight,
                time_completed
            } => SetDTO::Weighted {
                reps,
                weight,
                time_completed
            },

            Set::Timed {
                distance,
                time,
                time_completed
            } => SetDTO::Timed {
                distance,
                time,
                time_completed
            },
        }
    }
}