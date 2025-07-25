const express = require("express");
const router = express.Router();
const URL = require('../models/url')

router.get("/", async(req, res) => {
    const allUrls = await URL.find({}).sort({ _id: -1 });
  return res.render("home", {
    urls: allUrls,
  });
});

module.exports = router;
