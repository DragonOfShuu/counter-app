//! Module for interfacing with the database
use std::fs::File;
use std::io::Write;
use super::CounterType;
use serde::{Serialize, Deserialize};
use serde_json::Result as JsonResult;

#[derive(Serialize, Deserialize)]
pub struct Counter {
    id: String,
    data: CounterType,
}

impl Counter {
    pub fn new(data: CounterType) -> Self {
        Self {
            id: "".to_string(),
            data,
        }
    }
}
