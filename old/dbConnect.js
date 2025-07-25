const mongoose = require("mongoose");

async function dbConnect(url) {
  mongoose
    .connect(url)
    .catch((err) => console.log("500", err));
}
module.exports = {dbConnect};
