const express = require("express");
const postsRouter = require("./post");
const commentsRouter = require("./comments");
const router = express.Router();

router.use("/", [postsRouter]);
router.use("/", [commentsRouter]);

module.exports = router;
