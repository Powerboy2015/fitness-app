use rusqlite::Error;
use crate::infrastructures;
use crate::infrastructures::sqlite::Db;
use crate::interface::dto::CreateWorkoutDTO;

#[derive(Clone)]
pub struct WorkoutRecord {
    pub(crate) uuid: String,
    pub(crate) name: String,
    pub(crate) desc: Option<String>
}



pub struct WorkoutRepository {
    db: infrastructures::sqlite::Db,
}

pub type WorkoutRows = Vec<WorkoutRecord>;
impl WorkoutRepository {
    pub fn new(db : Db) -> Self {
        Self {
            db
        }
    }

    pub fn list(&self) -> Result<WorkoutRows, Error> {
        self.db.use_conn(|tx| {
            let mut stmt = tx.prepare(
                "SELECT * FROM Workouts"
            )?;

            let rows = stmt.query_map([], |row| {
                Ok(WorkoutRecord {
                    uuid: row.get(1)?,
                    name: row.get(2)?,
                    desc: row.get(3)?,
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