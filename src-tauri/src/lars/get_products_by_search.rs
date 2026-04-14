

#[tauri::command]
pub async fn get_products(product: String, page: u64) -> Result<String, String> {
    let client = reqwest::Client::new();
    let url = "https://www.mynetdiary.com/muiInstantFoodSearchFindFoods.do";

    let body = serde_json::json!({
        "searchToken": product,
        "page": page,
        "pageSize": 16
    });

    let res = client
        .post(url)
        .body(body.to_string())
        .send()
        .await;

    if let Ok(response) = res {
        let text = response.text().await.unwrap();
        return Ok(text);
    }

    Err("request failed".into())
}