pub mod auth;
pub mod structures;
pub mod x_take_impl;
pub mod crud;

use surrealdb::engine::local::{Mem, Db};
use surrealdb::Surreal;

use crate::ipc::structures::error::Result;

pub async fn set_up_surreal_db() -> Result<Surreal<Db>> {
    // Create database connection
    let db: Surreal<Db> = Surreal::new::<Mem>(()).await?;

    // Select a specific namespace / database
    db.use_ns(crate::consts::auth::NAMESPACE)
        .use_db(crate::consts::auth::DATABASE)
        .await?;
    Ok(db)
}
