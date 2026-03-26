use rusqlite::Error;

use crate::{domain::{AddTimedExerciseParams, AddWeighedExerciseParams, CompletedExerciseRepo}, infrastructures::sqlite::Db};

pub struct CompletedExerciseRepository {
    db: Db,
}

impl CompletedExerciseRepo for CompletedExerciseRepository {
    fn new(db :Db ) -> Self {
        Self { db }
    }

    fn add_timed_exercise(&self,req: AddTimedExerciseParams) -> Result<String,Error> {
        self.db.use_conn(|tx| {
            tx.execute("INSERT INTO completedCardioExercises(id,time,distance) VALUES(?1,?2,?3)",[
                req.completed_exercise_id,
                req.time.to_string(),
                req.distance.to_string()
            ])
        })?;
        
        Ok("fakka".to_string())
    }

    fn add_weighted_exercise(&self,req: AddWeighedExerciseParams) -> Result<String,Error> {
        self.db.use_conn(|tx| {
            tx.execute("INSERT INTO completedWeightExercises(id,reps,weight) VALUES(?1,?2,?3)",[
                req.completed_exercise_id,
                req.reps.to_string(),
                req.weight.to_string()
            ])
        })?;
        
        Ok("fakka".to_string())
    }
}