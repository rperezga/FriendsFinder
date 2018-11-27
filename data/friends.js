const fs = require("fs");
const path = require("path");
var raw = fs.readFileSync(path.join(__dirname, "friends.json"));
var tableArray = JSON.parse(raw);

module.exports = tableArray;
