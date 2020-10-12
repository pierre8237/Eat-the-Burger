const orm = require("../config/orm.js");
//select all burgers

//
const burger = {
  all: function (cb) {
    orm.all("burgers", function (res) {
      cb(res);
    });
  },
  create: function (name, cb) {},
  update: function (id, cb) {}
};

module.exports = burger;
