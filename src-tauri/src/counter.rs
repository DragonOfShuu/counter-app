//! Module containing functions to deal with counters
#![allow(unused)]

use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Counter {
    name: String,
    count: i64,
    color: String,
    default_count: i64,
    default_step: i64,
    date_created: i64,
    date_modified: i64,
}

#[tauri::command]
pub fn new_counter(counter: Counter) -> Result<String, String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter(id: String) -> Result<Counter, String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter_ids() -> Result<Vec<String>, String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn update_counter(id: String, counter: Counter) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn delete_counter(id: String) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn increment_counter(id: String, step: i64) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn decrement_counter(id: String, step: i64) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn reset_counter(id: String) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter_value(id: String) -> Result<i64, String> {
    Err("function is not implemented yet".to_string())
}

