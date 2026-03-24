use rusqlite::{params, params_from_iter, Error};
use crate::infrastructures;
use crate::infrastructures::sqlite::Db;
use crate::repository::exercise_repository::{ExerciseRecord, ExerciseRows};
use crate::repository::workout_repository::{WorkoutRecord};

pub struct WorkoutExerciseRepository {
    db: infrastructures::sqlite::Db,
}

impl WorkoutExerciseRepository {
    pub fn new(db:Db) -> Self {
        Self { db }
    }

    // links exercises in a single bulk query.
    pub fn link(&self,workout_id:String,exercise_ids: Vec<String>) -> Result<bool, Error> {
        self.db.use_conn(|tx| {
            let mut query = String::from(
                "INSERT INTO WorkoutExercises (WorkoutId, ExerciseId) VALUES "
            );

            let mut params_vec = Vec::new();

            for (i, exercise_id) in exercise_ids.iter().enumerate() {
                if i > 0 {
                    query.push_str(", ");
                }
                query.push_str("(?, ?)");
                params_vec.push(&workout_id);
                params_vec.push(exercise_id);
            }

            tx.execute(&query, params_from_iter(params_vec))?;
            
            Ok(())

        })?;

        Ok(true)
    }
}