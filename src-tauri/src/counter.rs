//! Module containing functions for the frontend to call
#![allow(unused)]

use serde::{Deserialize, Serialize};

mod storage;
use storage::*;

#[derive(clone, serialize, deserialize)]
#[serde(rename_all = "camelcase")]
pub struct CounterTypeModifiable{
    name: Option<string>,
    count: Option<i64>,
    color: Option<string>,
    default_count: Option<i64>,
    default_step: Option<i64>,
}

#[derive(clone, serialize, deserialize)]
#[serde(rename_all = "camelcase")]
pub struct CounterType {
    name: string,
    count: i64,
    color: string,
    default_count: i64,
    default_step: i64,
    date_created: i64,
    date_modified: i64,
}

#[tauri::command]
pub fn new_counter(counter: CounterTypeModifiable) -> Result<String, String> {
    Err("function is not implemented yet".to_string())
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
