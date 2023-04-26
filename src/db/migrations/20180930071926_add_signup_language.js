/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export function up (knex) {
  return knex.schema.table('subscribers', table => {
    table.string('signup_language')
  })
}

export function down (knex) {
  return knex.schema.table('subscribers', table => {
    table.dropColumn('signup_language')
  })
}
