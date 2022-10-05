const express = require("express");
const router = express.Router(); // 
const postsRouter = require("./posts")
const commentRouter = require("./comments")

router.use("/posts", postsRouter) 
router.use("/comments", commentRouter) 

module.exports = router

// app - index - posts
