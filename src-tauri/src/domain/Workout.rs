use crate::domain::Exercise::Exercise;

#[derive(Clone)]
pub struct Workout {
    pub uuid: String,
    pub name: String,
    pub desc: Option<String>,
    pub exercises: Vec<Exercise>,
}
impl Workout {}