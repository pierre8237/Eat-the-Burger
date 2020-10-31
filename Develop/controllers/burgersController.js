const express = require("express");
const burger = require("../models/burger.js");
const router = express.Router();

// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  burger.selectAll(function (burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    const exphbsObj = {
      burger_data: burgerData
    };
    console.log(exphbsObj);
    res.render("index", exphbsObj);
  });
});

// post route -> back to index
router.post("/api/burgers", function (req, res) {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});
// put route -> back to index
router.put("/burgers/:id", function (req, res) {
  let condition = "id " + req.params.id;
  burger.updateOne({ devoured: req.body.devoured }, condition, function (
    result
  ) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;
  burger.deleteOne(condition, function (result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
