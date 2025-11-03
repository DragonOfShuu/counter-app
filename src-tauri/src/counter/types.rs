//! Module containing CounterType and CounterTypeModifiable
//! and their methods and associated functions

use serde::{Deserialize, Serialize};
use chrono::{DateTime, Local, TimeZone};
use hex_color::HexColor;

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CounterTypeModifiable{
    name: Option<String>,
    count: Option<i64>,
    color: Option<String>,
    default_count: Option<i64>,
    default_step: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CounterType {
    name: String,
    count: i64,
    #[serde(with = "hex_color::rgb")]
    color: HexColor,
    default_count: i64,
    default_step: i64,
    date_created: DateTime<Local>,
    date_modified: DateTime<Local>,
}

impl From<CounterTypeModifiable> for CounterType {
    /// Create a CounterType instance from a partial CounterTypeModifiable
    fn from(counter: CounterTypeModifiable) -> Self {
        Self::new().update(counter)
//        let current_time = Local::now();

//        Self {
//            name: counter.name.unwrap_or("Counter ".to_string()),
//            count: counter.count.unwrap_or(0),
//            color: if let Some(color) = counter.color {
//                HexColor::parse(&color).unwrap_or(HexColor::CYAN)
//            } else {
//                HexColor::CYAN
//            },
//            default_count: counter.default_count.unwrap_or(0),
//            default_step: counter.default_step.unwrap_or(0),
//            date_created: current_time,
//            date_modified: current_time,
//        }
    }
}

impl CounterType {
    pub fn new() -> Self {
        let current_time = Local::now();

        Self {
            name: "New Counter".to_string(),
            count: 0,
            color: HexColor::CYAN,
            default_count: 0,
            default_step: 0,
            date_created: current_time,
            date_modified: current_time,
        }
    }

    pub fn update(&self, new: CounterTypeModifiable) -> Self {
        Self {
            name: new.name.unwrap_or(self.name.clone()),
            count: new.count.unwrap_or(self.count),
            color: if let Some(color) = new.color {
                HexColor::parse(&color).unwrap_or(self.color)
            } else {
                self.color
            },
            default_count: new.default_count.unwrap_or(self.default_count),
            default_step: new.default_step.unwrap_or(self.default_step),
            date_created: self.date_created,
            date_modified: Local::now(),
        }
    }
}
