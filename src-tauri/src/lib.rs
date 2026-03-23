use rusqlite::Connection;
use tauri::Manager;
use std::sync::Mutex;

mod api;
mod infrastructures;

struct ctx {
    conn: Mutex<Connection>,
    session: String,
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

            let conn = infrastructures::sqlite::get_connection(&app);



            app.manage(ctx {
                conn: Mutex::new(conn),
                session: "Placeholder".to_string()
            });
            
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())

        // Add all frontend functions here
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}