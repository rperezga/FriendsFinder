var tableData = require("../data/friends");
const fs = require("fs");
const path = require("path");


module.exports = function (app) {

  app.get("/api/friendAmount", function (req, res) {
    return res.json(tableData);
  });

  app.post("/api/addFriend", function (req, res) {
    var totDiff;
    var diffArry = [];
    var newFriend = req.body;

    for (var i = 0; i < tableData.length; i++) {
      totDiff = 0;
      for (var j = 0; j < newFriend.questions.length; j++) {
        totDiff += Math.abs(tableData[i].questions[j] - newFriend.questions[j]);
      }
      diffArry.push(totDiff);
    }

    var match = diffArry.indexOf(Math.min(...diffArry));

    tableData.push(newFriend);

    fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", function (err, data) {
      if (err) throw err;
      var json = JSON.parse(data);
      json.push(newFriend);
      fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(json, null, 2), function (err) {
        if (err) throw err;
      });
    }); //fs.readFile
    res.json(tableData[match]);
  });

};
