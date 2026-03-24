use tauri::{Manager, State};
mod api;
mod infrastructures;
mod repository;
mod interface;
mod application;

use infrastructures::sqlite::Db;
use repository::workout_repository::WorkoutRepository;
use crate::application::workout_service::WorkoutService;

struct Ctx {
    service: Service,
}

struct Service {
    workout: WorkoutService,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Tauri building process

    // sets up the default structure of the database.
    tauri::Builder::default()
        .setup(|app| {
            
            // moves the database file to the right location
            // and sets up additional tables.
            infrastructures::sqlite::build_database(app);

            //creates an connection to the database.
            let conn = infrastructures::sqlite::get_connection(app);

            let db = Db::new(conn);
            let service = Service {
                workout: WorkoutService::new(WorkoutRepository::new(db.clone())),
            };

            app.manage(Ctx {
                service
            });

            //finish
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())

        // Add all frontend functions here
        .invoke_handler(tauri::generate_handler![
            interface::tauri_commands::list_workouts,
            interface::tauri_commands::create_workout,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
