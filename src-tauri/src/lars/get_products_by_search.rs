#[tauri::command]
pub async fn get_products(product: String, page: u64) -> Result<serde_json::Value, String> {
    let body = reqwest::get(format!(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms={}&search_simple=1&action=process&json=1&countries=nl&page={}",
        product, page
    ))
    .await
    .map_err(|e| e.to_string())?
    .json::<serde_json::Value>()
    .await
    .map_err(|e| e.to_string())?;

    Ok(body)
}