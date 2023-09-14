const models = require("../models");

const browse = (req, res) => {
  models.language
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
  models.language
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.status(404).send("Status: Not Found");
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const edit = (req, res) => {
  const language = req.body;
  language.id = parseInt(req.params.id, 10);

  models.language
    .update(language)
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
  const language = req.body;

  models.language
    .insert(language)
    .then(([result]) => {
      res.location(`/languages/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const destroy = (req, res) => {
  models.language
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
