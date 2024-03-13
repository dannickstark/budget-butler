use serde::Serialize;


#[derive(Serialize)]
pub struct Credentials<'a> {
    pub email: &'a str,
    pub pass: &'a str,
}