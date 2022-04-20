const express = require('express')
const cors = require("cors");
const app = express()
const mysql = require('mysql')
const PORT = process.env.PORT || 3306;

class SetConnection{
  
    onUseExpress(){
      app.use(express.urlencoded({ extended: true }));
      app.use(cors())
    }
  
    onCreateConnection(){
      return mysql.createConnection({
        // connectionLimit: 100,  
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'your_database_name',
        port: PORT
      }) ;
    }
  
    onConnect(){
      this.onCreateConnection().connect(err =>{
        if (err){
          console.error("Something went wrong connecting to server "+err)
          return err
        }
        console.log("Connected")
      })
    }
  
    init(){
      this.onConnect()
      this.onUseExpress()
    }
  }
  
const connX = new SetConnection();
connX.init();
const conn = connX.onCreateConnection();
  
module.exports = {
    express, cors, app, mysql, PORT, conn
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});