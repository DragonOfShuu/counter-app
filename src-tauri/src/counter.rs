//! Module containing functions for the frontend to call
#![allow(unused)]

use serde::{Deserialize, Serialize};
use uuid::Uuid;

mod storage;

mod types;
use types::{CounterType, CounterTypeModifiable};

#[tauri::command]
pub fn new_counter(counter_data: CounterTypeModifiable) -> Result<Uuid, String> {
    let counter = CounterType::from(counter_data);
    

    Err("Unable to create counter".to_string())
}

#[tauri::command]
pub fn get_counter(id: String) -> Result<CounterType, String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter_ids() -> Result<Vec<String>, String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn update_counter(id: String, counter: CounterTypeModifiable) -> Result<(), String> {
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn delete_counter(id: String) -> Result<bool, String> {
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
