//! Module containing functions to deal with counters

pub struct Counter {
    name: String,
    count: i64,
    color: String,
    defaultCount: i64,
    defaultStep: i64,
    dateCreated: i64,
    dateModified i64,
}

pub fn new_counter(counter: Couter) -> String {
    
}

pub fn get_counter(id: String) -> Result<Counter> {

}

pub fn get_counter_ids() -> Vec<String> {

}

pub fn update_counter(id: String, counter: Counter) -> Result<()> {

}

pub fn delete_counter(id: String) -> Result<()> {

}

pub fn increment_counter(id: String, step: i64) -> Result<()> {

}

pub fn decrement_counter(id: String, step: i64) -> Result<()> {

}

pub fn reset_counter(id: String) -> Result<()> {

}

pub fn get_counter_value(id: String) -> Result<i64> {

}
