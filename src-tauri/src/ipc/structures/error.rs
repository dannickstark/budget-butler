//! This is the main (and only for now) application Error type.
//! It's using 'thiserror' as it reduces boilerplate error code while providing rich error typing.
//!
//! Notes:
//!     - The strategy is to start with one Error type for the whole application and then seggregate as needed.
//!     - Since everything is typed from the start, renaming and refactoring become relatively trivial.
//!     - By best practices, `anyhow` is not used in application code, but can be used in unit or integration test (will be in dev_dependencies when used)
//!
use serde::{ser::Serializer, Serialize};

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    CtxFail,

    XValueNotOfType(&'static str),

    XPropertyNotFound(String),

    StoreFailToCreate(String),

    JsonSerde(serde_json::Error),

    ModqlOperatorNotSupported(String),

    SurrealEmbedded(surrealdb::err::Error),

    SurrealClient(surrealdb::Error),

    IO(std::io::Error),

    Message(String),
}

// region:    --- Froms

impl From<serde_json::Error> for Error {
    fn from(val: serde_json::Error) -> Self {
        Error::JsonSerde(val)
    }
}
impl From<surrealdb::err::Error> for Error {
    fn from(val: surrealdb::err::Error) -> Self {
        Error::SurrealEmbedded(val)
    }
}
impl From<surrealdb::Error> for Error {
    fn from(val: surrealdb::Error) -> Self {
        Error::SurrealClient(val)
    }
}
impl From<std::io::Error> for Error {
    fn from(val: std::io::Error) -> Self {
        Error::IO(val)
    }
}
// endregion: --- Froms

// region:    --- Error Boiler
impl std::fmt::Display for Error {
    fn fmt(&self, fmt: &mut std::fmt::Formatter) -> core::result::Result<(), std::fmt::Error> {
        write!(fmt, "{self:?}")
    }
}

impl std::error::Error for Error {}
// endregion: --- Error Boiler

// we must manually implement serde::Serialize
impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> core::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
