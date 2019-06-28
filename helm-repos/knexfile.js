const fs = require('fs');
const pg = require('pg');

const url = process.env.DATABASE_URI || fs.readFileSync('/var/openfaas/secrets/database-uri', 'utf8').split('?')[0];
if (!process.env.DATABASE_URI) {
  pg.defaults.ssl = true;
}

console.log(`Connecting to ${url.replace(/:[^:]+@/, ':***@')}`);
module.exports = {
  client: 'pg',
  connection: url,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
