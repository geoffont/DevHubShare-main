const AbstractManager = require("./AbstractManager");

class AnswerManager extends AbstractManager {
  constructor() {
    super({ table: "answer" });
  }

  insert(answer) {
    return this.database.query(
      `insert into ${this.table} (answer_text, post_id, user_id) values (?, ?, ?)`,
      [answer.answer_text, answer.post_id, answer.user_id]
    );
  }

  update(answer) {
    return this.database.query(
      `update ${this.table} set answer_text = ? where id = ?`,
      [answer.answer_text, answer.id]
    );
  }

  findAnswersByPostId(answer) {
    return this.database.query(
      `SELECT a.*, u.pseudo FROM ${this.table} AS a JOIN user AS u ON a.user_id = u.id WHERE a.post_id = ?`,
      [answer.post_id]
    );
  }

  deleteAnswersByPostId(answer) {
    return this.database.query(`delete from ${this.table} where post_id = ?`, [
      answer.post_id,
    ]);
  }
}

module.exports = AnswerManager;
