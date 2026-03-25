use rusqlite::Error;
use crate::domain::{ Exercises, Workout, Workouts};
use crate::infrastructures::sqlite::Db;

pub trait WorkoutRepo {
    fn new(db : Db) -> Self;
    fn list(&self) -> Result<Workouts, Error>;
    fn create(&self,create_workout_dto: CreateWorkoutParams) -> Result<bool, Error>;
}

pub struct CreateWorkoutParams {
    pub uuid: String,
    pub name: String,
    pub desc: String,
}



pub trait ExerciseRepo {
    fn new(db : Db) -> Self; // queries database and returns a list of all exercises.
    fn list(&self) -> Result<Exercises, Error>; // returns a filtered list based on the muscle group given.
    fn filtered_list(&self, muscle_group: &str) -> Result<Exercises, Error>;
}

pub trait WorkoutExerciseRepo {
    fn new(db : Db) -> Self;
    fn get_detailed(&self, workout_id: &str) -> Result<Workout, Error>; // links exercises in a single bulk query.
    fn link(&self,workout_id:String,exercise_ids: Vec<String>) -> Result<bool, Error>;
}