const bodyParser = require('body-parser');
const knex = require('./db');
// const helmRepos = require('./model/repository');
const validators = require('./middleware/validators');

knex.migrate.latest();

module.exports = async (config) => {
  const { app } = config;
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
    res.send('test');
  });
  app.post('/', validators.helmRepoRequestValidator, (req, res) => {
    console.log(req);
  });
};
