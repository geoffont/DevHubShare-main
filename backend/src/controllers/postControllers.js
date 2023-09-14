const models = require("../models");

const browse = (req, res) => {
  models.post
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
  models.post
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
  const post = req.body;
  post.id = parseInt(req.params.id, 10);
  models.post
    .update(post)
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
  const post = req.body;
  models.post
    .insert(post)
    .then(([result]) => {
      res.location(`/posts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const destroy = (req, res) => {
  models.post
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

const getPostsByUserId = (req, res) => {
  const { userId } = req.params;
  models.post
    .findPostsByUserId({ user_id: userId })
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const getPostsByLanguageId = (req, res) => {
  const { languageId } = req.params;
  models.post
    .findPostsByLanguageId({ language_id: languageId })
    .then(([rows]) => {
      res.send(rows);
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
  getPostsByUserId,
  getPostsByLanguageId,
};
