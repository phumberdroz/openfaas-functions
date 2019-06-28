/* eslint-disable func-names */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('helm_repos', (t) => {
      t.unique('name');
      t.unique('url');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('helm_repos', (t) => {
      t.dropUnique('name');
      t.dropUnique('url');
    }),
  ]);
};
