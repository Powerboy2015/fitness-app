use std::sync::Mutex;
use rusqlite::Connection;


pub struct Db {
    conn: Mutex<Connection>
}

impl Db {
    pub fn new(conn: Connection) -> Self {
        
    }
}