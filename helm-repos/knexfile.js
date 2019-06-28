const fs = require('fs');
const pg = require('pg');

let migrationsDir = './db/migrations';
let seedsDir = './db/seeds';
let url = process.env.DATABASE_URI;

if (!process.env.DATABASE_URI) {
  pg.defaults.ssl = true;
  seedsDir = './functions/db/seeds';
  migrationsDir = './functions/db/seeds';
  [url] = fs.readFileSync('/var/openfaas/secrets/database-uri', 'utf8').split('?');
}

console.log(`Connecting to ${url.replace(/:[^:]+@/, ':***@')}`);
module.exports = {
  client: 'pg',
  connection: url,
  migrations: {
    directory: migrationsDir,
  },
  seeds: {
    directory: seedsDir,
  },
};
