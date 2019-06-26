exports.up = function (knex, Promise) {
  return knex.schema.createTable('helm_repos', (t) => {
    t.uuid('id').primary();
    t.string('name').notNullable().comment('Repo name');
    t.string('url').notNullable().comment('Repo url');
    t.timestamp('last_checked_at').defaultTo(knex.fn.now());
    t.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('helm_repos')
};
