use rusqlite::Error;

use crate::{domain::{SaveSessionParams, WorkoutHistoryRepo}, infrastructures::sqlite::Db};

pub struct WorkoutHistoryRepository {
    db: Db,
}

impl WorkoutHistoryRepo for WorkoutHistoryRepository {
    fn new(db :Db ) -> Self {
        Self { db }
    }

    fn add(&self,params: SaveSessionParams) -> Result<bool,Error> {
            self.db.use_conn(|tx| {
                tx.execute("INSERT INTO workoutHistory(SessionId,WorkoutId,Started_at,Completed_at) VALUES (?1,?2,?3,?4)",
            [params.session_id,params.workout_id,params.started_at,params.completed_at])
            })?;

            
        Ok(true)
    } 
}