import Knex from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('wallets', t => {
    t.increments('id').primary();
    t.string('address').unique();
    t.string('slackId').unique();
    t.string('privateKey').unique();
  });
};
