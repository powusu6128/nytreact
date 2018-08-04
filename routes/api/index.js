const express = require("express");
const router = express.Router();
const articleRoutes = require("./articles");

// Article routes
router.use("/articles", articleRoutes);

module.exports = router;