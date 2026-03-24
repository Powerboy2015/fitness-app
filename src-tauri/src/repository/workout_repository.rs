use rusqlite::Error;
use crate::domain::Workout::Workout;
use crate::infrastructures;
use crate::infrastructures::sqlite::Db;
use crate::interface::dto::CreateWorkoutDTO;

type Workouts = Vec<Workout>;

pub struct WorkoutRepository {
    db: infrastructures::sqlite::Db,
}

impl WorkoutRepository {
    pub fn new(db : Db) -> Self {
        Self {
            db
        }
    }

    pub fn list(&self) -> Result<Workouts, Error> {
        self.db.use_conn(|tx| {
            let mut stmt = tx.prepare(
                "SELECT * FROM Workouts"
            )?;

            let rows = stmt.query_map([], |row| {
                Ok(Workout {
                    uuid: row.get(1)?,
                    name: row.get(2)?,
                    desc: row.get(3)?,
                    exercises: Vec::new()
                })
            })?;

            rows.collect()
        })
    }

    pub fn create(&self,create_workout_dto: CreateWorkoutDTO) -> Result<bool, Error> {

        self.db.use_conn(|tx| {
            tx.execute("INSERT INTO Workouts(Uuid,Name,Desc) VALUES (?, ?, ?)",
                       [create_workout_dto.uuid,
                               create_workout_dto.name,
                               create_workout_dto.desc
                               ])
        })?;

        Ok(true)
    }
}