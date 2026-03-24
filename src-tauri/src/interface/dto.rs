#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WorkoutRecordDTO {
    pub uuid: String,
    pub name: String,
    pub desc: Option<String>,
}
pub type WorkoutListDTO = Vec<WorkoutRecordDTO>;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct CreateWorkoutDTO {
    pub name: String,
    pub desc: String
}