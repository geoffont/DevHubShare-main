/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserHasLanguageManager extends AbstractManager {
  constructor() {
    super({ table: "user_has_language" });
  }

  find(userId) {
    return this.database.query(
      `
      SELECT user_has_language.id, language.language_name
      FROM ${this.table}
      JOIN language ON user_has_language.language_id = language.id
      WHERE user_has_language.user_id = ?
      `,
      [userId]
    );
  }

  insert(user_has_language) {
    return this.database.query(
      `insert into ${this.table} (user_id, language_id)  values(?, ?) `,
      [user_has_language.user_id, user_has_language.language_id]
    );
  }

  update(user_has_language) {
    return this.database.query(
      `update ${this.table} set user_id = ?, language_id = ? where id = ?`,
      [
        user_has_language.user_id,
        user_has_language.language_id,
        user_has_language.id,
      ]
    );
  }

  deleteAllByUserId(userId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE user_id = ?`, [
      userId,
    ]);
  }
}

module.exports = UserHasLanguageManager;
