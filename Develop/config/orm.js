// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.

const connection = require("../config/connection");

// wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
// {
//   burger_data: burgerData;
// }
function createQm(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(obj) {
  let arr = [];
  for (key in obj) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf("") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
    return arr.toString;
  }
}

const orm = {
  selectAll: function (table, cb) {
    const dbQuery = "SELECT * FROM " + table + ";";
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  insertOne: function (table, cols, vals, cb) {
    const dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ")" +
      "VALUES (" +
      createQm(vals.length) +
      ") ";
    console.log(" DBQuery:" + dbQuery);
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  updateOne: function (table, objColVals, condition, cb) {
    const dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;
    console.log(" DBQuery:" + dbQuery);
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  deleteOne: function (table, condition, cb) {
    const dbQuery = "DELETE " + "FROM " + table + " WHERE " + condition;
    console.log(" DBQuery:" + dbQuery);
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

module.exports = orm;

//These are the methods you will use to execute the necessary MySQL commands in the controllers

//THESE ARE THE METHODS THAT YOU WILL NEED TO USE IN ORDER TO RETRIEVE AND STORE THE DATA TO THE DATABASE.
// `selectAll()`
// `insertOne()`
// `updateOne()`
// `deleteOne()`;
