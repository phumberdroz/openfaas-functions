const knex = require('../db');
// const get = function (id) {;
//   return knex('helm_repos').select().where({ id }).first()
//     .then(mapDeviceWithAliases);
// };


const create = async function (payload) {
  await helmRepoSchema.validate(payload);
};

// const update = function (id, payload) {
//   return knex('helm_repos').select().where({ id, tenant }).first()
//     .then(mapDeviceWithAliases);
// };

module.exports = {
  // get,
  create,
  // update,
};
