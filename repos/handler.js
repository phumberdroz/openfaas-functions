"use strict"
const knex = require('./db');
knex.migrate.latest()
module.exports = (event, context) => {
  if(event.path == "/login") {
    return context
          .status(200)
          .succeed('Welcome to login.')
  }

  return context
        .status(200)
        .succeed('Welcome to default.')
}