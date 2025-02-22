const env = require('dotenv');
const mysql = require('mysql');

var con = mysql.createConnection({
      user              :process.env.MYSQL_USER,
      password          :process.env.MYSQL_PASS,
      host              :process.env.MYSQL_HOST, 
      port              :process.env.MYSQL_PORT,
      database          :process.env.MYSQL_DB  
});

con.connect((error)=>{
       if(error) console.log(error);
       else 
       console.log("successfully connected to MYSQL");
});

module.exports = con;
console.log("DB Connection is working");
