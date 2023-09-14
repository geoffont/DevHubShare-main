const AbstractManager = require("./AbstractManager");

class LanguageManager extends AbstractManager {
  constructor() {
    super({ table: "language" });
  }

  insert(language) {
    return this.database.query(
      `insert into ${this.table} (language_name) values (?)`,
      [language.language_name]
    );
  }

  update(language) {
    return this.database.query(
      `update ${this.table} set language_name = ? where id = ?`,
      [language.language_name, language.id]
    );
  }
}

module.exports = LanguageManager;
