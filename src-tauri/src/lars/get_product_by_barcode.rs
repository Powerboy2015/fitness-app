use serde_json::json;
use std::collections::HashMap;
use serde_json::Value;
use openfoodfacts::{self as off};

#[tauri::command]
pub fn get_product_by_barcode() {
    let client = off::v0().build().unwrap();
    let code = "3850102123681";

    let response = client.product(code, None).unwrap();
    let result_json = json!(response.json::<HashMap::<String, Value>>().unwrap());
    print!("{}", result_json)
}