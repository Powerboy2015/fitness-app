use tauri::Manager;
mod api;
mod infrastructures;

use infrastructures::sqlite::Db;

struct Ctx {
    db: infrastructures::sqlite::Db,
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

            //creates an connection to the database.
            let conn = infrastructures::sqlite::get_connection(&app);



            app.manage(Ctx {
                db: Db::new(conn),
                session: "Placeholder".to_string()
            });
            
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())

        // Add all frontend functions here
        .invoke_handler(tauri::generate_handler![
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

