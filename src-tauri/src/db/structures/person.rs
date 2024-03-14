use serde::{Deserialize, Serialize};
use surrealdb::{engine::local::Db, sql::Thing, Surreal};
use crate::{db::crud::create, ipc::structures::error::{Error, Result}, utils::x_take::XTake};
use surrealdb::sql::{Object, Value};


#[derive(Debug, Serialize, Deserialize)]
pub struct Person {
	pub id: String,
	pub name: String,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct NewPerson {
	pub name: String,
}

impl TryFrom<Object> for Person {
	type Error = Error;
	fn try_from(mut val: Object) -> Result<Person> {
		let project = Person {
			id: val.x_take_val("id")?,
			name: val.x_take_val("name")?
		};

		Ok(project)
	}
}

impl Person {
	const ENTITY: &'static str = "person";

    pub async fn create(db: &Surreal<Db>, name: &str) -> Result<Person> {
        create(db, Self::ENTITY, NewPerson {
            name: String::from(name)
        }).await
    }

    pub async fn update(&self, db: &Surreal<Db>, id: &str) -> Result<Option<Person>> {
        let record: Option<Person> = db.update(("person", id)).merge(self).await?;
        Ok(record)
    }

    pub async fn select(db: &Surreal<Db>, id: &str) -> Result<Person> {
        let record: Option<Person> = db.select(("person", id)).await?;
        match record {
            Some(data) => Ok(data),
            None => Err(Error::Message("No record found".to_string())),
        }
    }

    pub async fn select_all(db: &Surreal<Db>) -> Result<Vec<Person>> {
        let record: Vec<Person> = db.select("person").await?;
        Ok(record)
    }
}

