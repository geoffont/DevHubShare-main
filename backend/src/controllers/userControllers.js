/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.user
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
  models.user
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
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  const language = user.language_id;
  models.user
    .update(user)
    .then(() => {
      return models.user_has_language.deleteAllByUserId(user.id);
    })
    .then(() => {
      const promises = language.map((language_id) => {
        return models.user_has_language.insert({
          user_id: user.id,
          language_id,
        });
      });
      return Promise.all(promises);
    })
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
  const user = req.body;
  models.user
    .insert(user)
    .then(([result]) => {
      const user_id = result.insertId;
      const language = user.language_id;
      Promise.all(
        language.map((language_id) => {
          return models.user_has_language.insert({ user_id, language_id });
        })
      )
        .then(() => {
          res.location(`/users/${user_id}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Status: Internal Server Error");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const destroy = (req, res) => {
  const userId = req.params.id;
  models.user
    .delete(userId)
    .then(() => {
      return models.user.delete(userId);
    })
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

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUser(email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser;
        next();
      } else {
        res.status(401).send("Status: Unauthorized");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
};
