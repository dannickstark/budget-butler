pub mod consts;
pub mod db;
pub mod ipc;
pub mod prelude;
pub mod utils;

use core::result::Result::Ok;
use db::set_up_surreal_db;
use ipc::commands::{get_person, get_persons, greet, create_person};

use ipc::structures::error::Result;
use std::sync::Arc;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() -> Result<()> {
    let db = set_up_surreal_db().await?;
    let db = Arc::new(db);

    tauri::Builder::default()
        .manage(db)
        .invoke_handler(tauri::generate_handler![greet, get_person, get_persons, create_person])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
