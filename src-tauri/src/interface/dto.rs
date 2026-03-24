#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutRecordDTO {
    pub uuid: String,
    pub name: String,
    pub desc: Option<String>,
}
pub type WorkoutListDTO = Vec<WorkoutRecordDTO>;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct CreateWorkoutDTO {
    pub uuid: String,
    pub name: String,
    pub desc: String
}

#[derive(serde::Serialize, serde::Deserialize, Debug,Clone)]
pub struct CreateWorkoutInput {
    pub uuid: String,
    pub name: String,
    pub desc: Option<String>,
    pub exercises: Option<Vec<String>>
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
pub type ExerciseListDTO = Vec<ExerciseRecordDTO>;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct DetailedWorkoutDTO {
    pub uuid: String,
    pub name: String,
    pub desc: String,
    pub exercises: ExerciseListDTO,
}