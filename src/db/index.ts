import Knex from 'knex';
import * as migration from './migrations/00_init';

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite',
  },
  useNullAsDefault: true,
});

const migrate = async () => {
  await migration.up(knex);
};

export const insertWallet = (knex: Knex, address: string, slackId: string) => {
  return knex('wallets').insert({
    address,
    slackId,
  });
};

export const getWalletBySlackId = (knex: Knex, slackId: string) => {
  return knex('wallets')
    .where({ slackId })
    .first();
};
