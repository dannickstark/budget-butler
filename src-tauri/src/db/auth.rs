use anyhow::Ok;
use surrealdb::opt::auth::Scope;
use surrealdb::{Surreal, engine::local::Db};
use super::structures::auth::Credentials;

pub async fn signup<'a, 'b>(db: &'a Surreal<Db>, credentials: Credentials<'b>) -> (anyhow::Result<String>) {
    let jwt = db.signup(Scope {
        namespace: &crate::consts::auth::NAMESPACE,
        database: &crate::consts::auth::DATABASE,
        scope: "user",
        params: credentials,
    }).await?;
    
    // ⚠️: It is important to note that the token should be handled securely and protected from unauthorized access.
    let token = jwt.as_insecure_token();
    Ok(String::from(token))
}

pub async fn signin<'a, 'b>(db: &'a Surreal<Db>, credentials: Credentials<'b>) -> (anyhow::Result<String>) {
    let jwt = db.signin(Scope {
        namespace: &crate::consts::auth::NAMESPACE,
        database: &crate::consts::auth::DATABASE,
        scope: "user",
        params: credentials,
    }).await?;
    
    // ⚠️: It is important to note that the token should be handled securely and protected from unauthorized access.
    let token = jwt.as_insecure_token();
    Ok(String::from(token))
}