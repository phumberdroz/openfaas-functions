const bodyParser = require('body-parser');
const knex = require('./db');
// const helmRepos = require('./model/repository');
const validators = require('./middleware/validators');
const { errorHandler } = require('./middleware/errorHandler');
const repoModel = require('./model/repository');

process.on('uncaughtException', (err) => {
  console.error(err, `uncaughtException ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', err);
  process.exit(1);
});

module.exports = async (config) => {
  const { app } = config;
  await knex.migrate.latest();
  console.log('request')
  app.use(bodyParser.json());
  app.post('/', validators.helmRepoRequestValidator, (req, res, next) => {
    repoModel.create(req).then((obj) => {
      res.status(201);
      res.json(obj);
    }).catch(next);
  });
  app.get('/:repoName', (req, res, next) => {
    repoModel.get(req.params.repoName).then((obj) => {
      res.status(200);
      res.json(obj);
    }).catch(next);
  });
  app.use(errorHandler);
};
