
use crate::db::structures::person::{Person, PersonRecord};
use crate::ipc::structures::error::Result;
use surrealdb::Surreal;
use surrealdb::engine::local::Db;
use tauri::{command, State};
use std::sync::Arc;

#[command]
pub async fn get_person(id: &str, db: State<'_, Arc<Surreal<Db>>>) -> Result<PersonRecord> {
    let person: PersonRecord = Person::select(&db, id).await?;
    Ok(person)
}

#[command]
pub async fn get_persons(db: State<'_, Arc<Surreal<Db>>>) -> Result<Vec<PersonRecord>> {
    let persons: Vec<PersonRecord> = Person::select_all(&db).await?;
    Ok(persons)
}

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}