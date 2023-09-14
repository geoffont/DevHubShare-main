const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });
        delete req.user.hashedPassword;
        res.status(201).send({ token, userId: req.user.id }); //  retour token + user ID
      } else {
        res.status(401).send("Status: Unauthorized");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Status: Internal Server Error");
    });
};
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Status: Unauthorized");
  }
};
const verifyId = (req, res, next) => {
  try {
    if (req.payload.sub === parseInt(req.params.id, 10)) {
      next();
    } else {
      res.status(403).send("Status: Forbidden");
    }
  } catch (err) {
    console.error(err);
    res.status(401).send("Status: Unauthorized");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
};
