var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_chensij',
  password        : '6547',
  database        : 'cs290_chensij'
});

module.exports.pool = pool;
