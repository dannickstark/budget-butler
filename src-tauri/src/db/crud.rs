use serde::Serialize;
use surrealdb::{engine::local::Db, Surreal};
use crate::ipc::structures::error::{Error, Result};
use surrealdb::sql::Object;

pub async fn create<D: Serialize, E>(db: &Surreal<Db>, _entity: &'static str, data: D) -> Result<E>
where
	E: TryFrom<Object, Error = Error> {
    let record: Vec<Object> = db.create(_entity)
    .content(data)
    .await?;

    match record.into_iter().next() {
        Some(data) => {
            data.try_into()
        },
        None => Err(Error::Message("No record found".to_string())),
    }
}

pub async fn update<D: Serialize>(db: &Surreal<Db>, _entity: &'static str, id: &str, data: D) -> Result<Option<Object>> {
    let record: Option<Object> = db.update((_entity, id)).merge(data).await?;
    Ok(record)
}

pub async fn select(db: &Surreal<Db>, _entity: &'static str, id: &str) -> Result<Object> {
    let record: Option<Object> = db.select((_entity, id)).await?;
    match record {
        Some(data) => Ok(data),
        None => Err(Error::Message("No record found".to_string())),
    }
}

pub async fn select_all(db: &Surreal<Db>, _entity: &'static str) -> Result<Vec<Object>> {
    let record: Vec<Object> = db.select(_entity).await?;
    Ok(record)
}