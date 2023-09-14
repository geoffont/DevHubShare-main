/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.user_has_language
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const read = (req, res) => {
  const userId = req.params.id;
  models.user_has_language
    .find(userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.status(404).send("Status: Not Found");
      } else {
        const result = rows;
        res.send(result);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const edit = (req, res) => {
  const user_has_language = req.body;
  user_has_language.id = parseInt(req.params.id, 10);
  models.user_has_language
    .update(user_has_language)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Status: Not Found");
      } else {
        res.status(204).send("Status: No Content");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const add = (req, res) => {
  const user_has_language = req.body;
  models.user_has_language
    .insert(user_has_language)
    .then(([result]) => {
      res.location(`/user_has_language/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const destroy = (req, res) => {
  models.user_has_language
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Status: Not Found");
      } else {
        res.status(204).send("Status: No Content");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
