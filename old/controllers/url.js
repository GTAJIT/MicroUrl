const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenUrl(req, res) {
  const allUrls = await URL.find({}).sort({ _id: -1 });;
  const body = req.body;
  if (!body) return res.status(400).json({ error: "URL is requred" });

  // Check if the URL already exists
  const existingEntry = await URL.findOne({ redirectUrl: body.url });

  if (existingEntry) {
    // Return the existing short URL
    return res.render("home", {
      urls: allUrls,
      id: existingEntry.shortId,
      orgId: body.url,
      message: "Short URL already exists for this link!",
    });
  }

  // Otherwise, generate a new one
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortID,
    orgId: body.url,
    urls: allUrls,
    message: "New short URL created successfully.",
  });
}
async function handleRedirect(req, res) {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectUrl);
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenUrl,
  handleRedirect,
  handleGetAnalytics,
};
