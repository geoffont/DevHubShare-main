const express = require("express");
const { hashPassword, verifyPassword, verifyToken } = require("../auth");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const languageControllers = require("./controllers/languageControllers");
const postControllers = require("./controllers/postControllers");
const answerControllers = require("./controllers/answerControllers");
const userHasLanguageControllers = require("./controllers/userHasLanguageControllers");

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.post("/users", hashPassword, userControllers.add);
router.get("/languages", languageControllers.browse);

router.get("/user_has_language", userHasLanguageControllers.browse);
router.get("/user_has_language/:id", userHasLanguageControllers.read);
router.put("/user_has_language/:id", userHasLanguageControllers.edit);
router.post("/user_has_language", userHasLanguageControllers.add);
router.delete("/user_has_language/:id", userHasLanguageControllers.destroy);

router.use(verifyToken);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

router.get("/languages/:id", languageControllers.read);
router.put("/languages/:id", languageControllers.edit);
router.post("/languages", languageControllers.add);
router.delete("/languages/:id", languageControllers.destroy);

router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.read);
router.put("/posts/:id", postControllers.edit);
router.post("/posts", postControllers.add);
router.delete("/posts/:id", postControllers.destroy);

router.get(
  "/posts/user/:userId",
  verifyToken,
  postControllers.getPostsByUserId
);
router.get("/posts/language/:languageId", postControllers.getPostsByLanguageId);
router.get(
  "/answers/post/:postId",
  verifyToken,
  answerControllers.getAnswersByPostId
);

router.get("/answers", answerControllers.browse);
router.get("/answers/:id", answerControllers.read);
router.put("/answers/:id", answerControllers.edit);
router.post("/answers", answerControllers.add);
router.delete("/answers/:id", answerControllers.destroy);
router.delete(
  "/answers/post/:postId",
  verifyToken,
  answerControllers.destroyAnswerByPostId
);

module.exports = router;
