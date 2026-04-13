use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductResponse {
    pub count: u32,
    pub products: Vec<Value>, // Of een meer specifieke struct
    pub skip: u32,
}

#[tauri::command]
pub async fn get_products(product: String) -> Result<ProductResponse, String> {
    let url = format!(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms={}&search_simple=1&action=process&json=1countries=nl",
        product
    );
    
    let response = reqwest::get(&url)
        .await
        .map_err(|e| format!("Request failed: {}", e))?
        .json::<ProductResponse>()
        .await
        .map_err(|e| format!("JSON decode failed: {}", e))?;

    println!("Found {} products", response.count);
    Ok(response)
}