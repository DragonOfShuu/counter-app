//! Module containing functions to deal with counters

use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Counter {
    name: String,
    count: i64,
    color: String,
    defaultCount: i64,
    defaultStep: i64,
    dateCreated: i64,
    dateModified: i64,
}

#[tauri::command]
pub fn new_counter(counter: Counter) -> Result<String, String> {
    Ok("placeholder".to_string())
}

#[tauri::command]
pub fn get_counter(id: String) -> Result<Counter, String> {
    Ok(
        Counter {
            name: "placeholder".to_string(),
            count: 0,
            color: "FFFFFF".to_string(),
            defaultCount: 0,
            defaultStep: 0,
            dateCreated: 0,
            dateModified: 0,
        }
    )
}

#[tauri::command]
pub fn get_counter_ids() -> Result<Vec<String>, String> {
    Ok(vec![])
}

#[tauri::command]
pub fn update_counter(id: String, counter: Counter) -> Result<(), String> {

    Ok(())
}

#[tauri::command]
pub fn delete_counter(id: String) -> Result<(), String> {

    Ok(())
}

#[tauri::command]
pub fn increment_counter(id: String, step: i64) -> Result<(), String> {

    Ok(())
}

#[tauri::command]
pub fn decrement_counter(id: String, step: i64) -> Result<(), String> {

    Ok(())
}

#[tauri::command]
pub fn reset_counter(id: String) -> Result<(), String> {

    Ok(())
}

#[tauri::command]
pub fn get_counter_value(id: String) -> Result<i64, String> {

    Ok(0)
}

