//! Module for interfacing with the database
use std::fs::File;
use std::io::Write;
use super::CounterData;
use serde::{Serialize, Deserialize};
use serde_json::Result as JsonResult;

#[derive(Serialize, Deserialize)]
pub struct Counter {
    id: String,
    name: String,
    count: String,
    color: String,
    default_count: i64,
    default_step: i64,
    date_created: i64,
    date_modified: i64,
}

impl Counter {
    pub fn new(data: CounterData) -> Self {
        // TODO:
    }
}
