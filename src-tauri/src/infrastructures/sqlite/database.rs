use std::sync::Mutex;
use rusqlite::{Connection, Transaction};
use std::sync::Arc;

pub struct Db {
    conn: Arc<Mutex<Connection>>
}

impl Db {
    pub fn new(_conn: Connection) -> Self {
        Self {
            conn: Arc::new(Mutex::new(_conn))
        }
    }

    //This function is like an foreach, F is the function we're passing and 
    //T is the return type of that function.
    pub fn use_conn<F,T>(&self, f: F) -> T
    //the were explains what kind of function F is.
    // it's a function that fires once, has a transaction struct and returns the type of the func.
    where F: FnOnce(&Transaction) -> T
     {
        let mut conn = self.conn.lock().expect("lock is contaminated");

        let tx = conn.transaction().unwrap();

        //we then here fire said function. and grab the result aka T.
        let result = f(&tx);
        
        tx.commit().unwrap();
        result
    }
}