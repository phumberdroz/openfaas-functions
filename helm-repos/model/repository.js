const knex = require('../db');
const errors = require('../utils/errors');

async function create(payload) {
  const { url, name } = payload.body;
  const dbObj = await knex('helm_repos')
    .insert({ url, name })
    .returning('*')
    .catch((err) => {
      if (err.code === '23505') {
        const collumn = err.detail.match(/\((.*?)\)/g)[0].replace('(', '').replace(')', '');
        throw new errors.UniqueConstraintValidationError(`Duplicate entry for ${collumn}`);
      } else {
        throw err;
      }
    });
  return dbObj[0];
}
async function get(repoName) {
  const dbObj = await knex('helm_repos')
    .select()
    .where({ name: repoName })
    .first();
  if (dbObj === undefined) {
    throw new errors.HelmRepoNotFound(`Helm reposistory ${repoName} not found`);
  }
  return dbObj;
}
// const update = function (id, payload) {
//   return knex('helm_repos').select().where({ id, tenant }).first()
//     .then(mapDeviceWithAliases);
// };

module.exports = {
  get,
  create,
  // update,
};
