mod counter;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_haptics::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            counter::new_counter,
            counter::get_counter,
            counter::get_counter_ids,
            counter::update_counter,
            counter::delete_counter,
            counter::increment_counter,
            counter::decrement_counter,
            counter::reset_counter,
            counter::get_counter_value,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
