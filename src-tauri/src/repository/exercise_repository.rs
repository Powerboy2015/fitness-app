use rusqlite::Error;
use crate::infrastructures;
use crate::infrastructures::sqlite::Db;


pub struct ExerciseRecord {
    pub exercise_id: String,
    pub name: String,
    pub gif_url: String,
    pub target_muscles: String,
    pub body_parts: String,
    pub equipments: String,
    pub secondary_muscles: String,
    pub instructions: Option<String>,
}

pub type ExerciseRows = Vec<ExerciseRecord>;

pub struct ExerciseRepository {
    db: infrastructures::sqlite::Db,
}
impl ExerciseRepository {
    pub fn new(db: Db) -> Self {
        Self {
            db
        }
    }

    pub fn list(&self) -> Result<ExerciseRows, Error> {
        self.db.use_conn(|tx| {
            let mut stmt = tx.prepare(
                "SELECT * FROM exercises"
            )?;

            let rows = stmt.query_map([], |row| {
                Ok(ExerciseRecord {
                    exercise_id: row.get(0)?,
                    name: row.get(1)?,
                    gif_url: row.get(2)?,
                    target_muscles: row.get(3)?,
                    body_parts: row.get(4)?,
                    equipments: row.get(5)?,
                    secondary_muscles: row.get(6)?,
                    instructions: row.get(7)?,
                })
            })?;

            rows.collect()
        })
    }
}