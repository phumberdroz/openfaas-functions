const fs = require('fs'); 
const url = fs.readFileSync('/var/openfaas/secrets/database-uri', 'utf8').split('?')[0]
var pg = require('pg');
pg.defaults.ssl = true;
console.log(`Connecting to ${url.replace(/:[^:]+@/, ':***@')}`);
module.exports = {
  client: 'pg',
  connection: url,
  migrations: {
    directory: './function/db/migrations',
  },
  seeds: {
    directory: './function/db/seeds',
  },
};
