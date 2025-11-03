//! Module containing functions for the frontend to call
#![allow(unused)]

use serde::{Deserialize, Serialize};
use uuid::Uuid;

mod storage;
use storage::store;

mod types;
use types::{CounterType, CounterTypeModifiable};

#[tauri::command]
pub fn new_counter(counter_data: CounterTypeModifiable) -> Result<Uuid, String> {
    store(CounterType::from(counter_data))
}

#[tauri::command]
pub fn get_counter(id: String) -> Result<CounterType, String> {
    // implement in storage module
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter_ids() -> Result<Vec<String>, String> {
    // implement in storage module
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn update_counter(id: String, counter_data: CounterTypeModifiable) -> Result<(), String> {
    // get counter from id
    // update counter
    // store counter
    // return result
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn delete_counter(id: String) -> Result<bool, String> {
    // implement in storage module
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn increment_counter(id: String, step: i64) -> Result<(), String> {
    // get counter from id
    // update counter
    // store counter
    // return result
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn decrement_counter(id: String, step: i64) -> Result<(), String> {
    // get counter from id
    // update counter
    // store counter
    // return result
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn reset_counter(id: String) -> Result<(), String> {
    // get counter
    // call reset method on counter
    // store counter
    // return result
    Err("function is not implemented yet".to_string())
}

#[tauri::command]
pub fn get_counter_value(id: String) -> Result<i64, String> {
    // get counter
    // return count
    Err("function is not implemented yet".to_string())
}
