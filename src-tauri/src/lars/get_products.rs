use serde_json::Value;

#[tauri::command]
pub async fn get_products() -> Result<Value, String> {
    let resp = reqwest::get(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=kwark&search_simple=1&action=process&json=1"
    )
    .await
    .map_err(|e| e.to_string())?
    .json::<Value>()
    .await
    .map_err(|e| e.to_string())?;
    println!("START");
    println!("{:#?}", resp);
    println!("END");
    Ok(resp) 
}