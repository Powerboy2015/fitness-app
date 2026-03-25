use crate::domain::{Exercise, Workout};

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

