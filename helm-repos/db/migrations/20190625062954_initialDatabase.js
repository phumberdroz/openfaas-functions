/* eslint-disable func-names */
exports.up = function (knex) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('helm_repos', (t) => {
      t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      t.string('name').notNullable().comment('Repo name');
      t.string('url').notNullable().comment('Repo url');
      t.timestamp('last_checked_at').defaultTo(knex.fn.now());
      t.timestamps(true, true);
    })]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.raw('drop extension if exists "uuid-ossp"'),
    knex.schema.dropTable('helm_repos'),
  ]);
};
