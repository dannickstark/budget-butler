use tauri::command;

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
