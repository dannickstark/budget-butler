
use crate::db::structures::person::{Person};
use crate::ipc::structures::error::Result;
use surrealdb::Surreal;
use surrealdb::engine::local::Db;
use tauri::{command, State};
use std::sync::Arc;

#[command]
pub async fn get_person(id: &str, db: State<'_, Arc<Surreal<Db>>>) -> Result<Person> {
    let person: Person = Person::select(&db, id).await?;
    Ok(person)
}

#[command]
pub async fn get_persons(db: State<'_, Arc<Surreal<Db>>>) -> Result<Vec<Person>> {
    let persons: Vec<Person> = Person::select_all(&db).await?;
    Ok(persons)
}

#[command]
pub async fn create_person(db: State<'_, Arc<Surreal<Db>>>, name: &str) -> Result<Person> {
    let person: Person = Person::create(&db, name).await?;
    Ok(person)
}

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}