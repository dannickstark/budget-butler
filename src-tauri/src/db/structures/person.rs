use serde::{Deserialize, Serialize};
use surrealdb::{engine::local::Db, sql::Thing, Surreal};
use crate::ipc::structures::error::{Error, Result};

#[derive(Debug, Serialize)]
pub struct Name<'a> {
    pub first: &'a str,
    pub last: &'a str,
}

#[derive(Debug, Serialize)]
pub struct Person<'a> {
    pub title: &'a str,
    pub name: Name<'a>,
    pub marketing: bool,
}

impl<'a> Person<'a> {
    pub async fn create(&self, db: &Surreal<Db>) -> Result<PersonRecord> {
        let record: Vec<PersonRecord> = db.create("person").content(self).await?;

        match record.into_iter().next() {
            Some(data) => Ok(data),
            None => Err(Error::Message("No record found".to_string())),
        }
    }

    pub async fn update(&self, db: &Surreal<Db>, id: &str) -> Result<Option<PersonRecord>> {
        let record: Option<PersonRecord> = db.update(("person", id)).merge(self).await?;
        Ok(record)
    }

    pub async fn select(db: &Surreal<Db>, id: &str) -> Result<PersonRecord> {
        let record: Option<PersonRecord> = db.select(("person", id)).await?;
        match record {
            Some(data) => Ok(data),
            None => Err(Error::Message("No record found".to_string())),
        }
    }

    pub async fn select_all(db: &Surreal<Db>) -> Result<Vec<PersonRecord>> {
        let record: Vec<PersonRecord> = db.select("person").await?;
        Ok(record)
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PersonRecord {
    #[allow(dead_code)]
    pub id: Thing,
}
