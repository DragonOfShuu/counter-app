//! Module for interfacing with the database
use std::fs::File;
use std::collections::HashMap;
use std::io::prelude::*;
use serde_json::Result as JsonResult;
use serde_json::Map;
use super::types::CounterType;
use serde::{Serialize, Deserialize};
use uuid::Uuid;

/// The type that's represented by the json file
/// a list of essentially json objects with the UUID as a key
/// and a CounterType instance as its value
type Vault = Vec<HashMap<Uuid, CounterType>>;

/// Parses the json file and returns a Vault type
fn vault() -> Vault {
    let mut file = match File::open("counters.json") {
        Ok(file) => file,
        Err(_) => return Vec::new(),
    };
    
    let mut json_out = String::new();
    file.read_to_string(&mut json_out);

    serde_json::from_str(&json_out).unwrap_or(Vec::new())
}

/// Stores a CounterType instance in the json file
/// and returns a generated UUID, or a String contianing
/// the error if it failed
pub fn store(counter: CounterType) -> Result<Uuid, String> {
    let id = Uuid::new_v4();
    let mut vault = vault();

    let mut data = HashMap::new();
    data.insert(id, counter);

    vault.push(data);

    let j = match serde_json::to_string_pretty(&vault) {
        Ok(j) => j,
        Err(e) => return Err(format!("couldn't create json from {:?}: {}", vault, e)),
    };

    let mut file = match File::create("counters.json") {
        Ok(file) => file,
        Err(e) => return Err(format!("couldn't create counters.json: {}", e)),
    };

    match file.write_all(j.as_bytes()) {
        Ok(_) => Ok(id),
        Err(e) => Err(format!("couldn't write to counters.json: {}", e)),
    }
}

/// Grabs a specific counter from the vault
pub fn get(id: Uuid) {
    
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    /// note that running this test will add a counter to the json file
    fn store_without_error() {
        let counter_data = CounterType::new();

        store(counter_data).unwrap();
    }
}
