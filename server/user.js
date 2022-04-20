const { app,conn } = require("./config");

class Users{
  
    onSignUp(){
      app.get('/add/user',  (req, res) => {
      
        const {firstName, lastName, email, passCode, birthDate } = req.query
      
        var sql = `INSERT INTO users(firstName, lastName, email, passCode, birthDate, joined) 
                  values(?, ?, ?, ?, ?, current_timestamp());`
        
        conn.query(sql, [firstName, lastName, email, passCode, birthDate], (err, results) =>{
          if (err){
            console.log(err)
            return err
          } else{
            res.send(results)
          }
        });
      });
    }
  
    readUsers(){
      app.get('/users', (req, res) => {
        
        const sql = `SELECT * FROM users`
        
        conn.query(sql, (err, results) => {
          if (err) return err;
          
          console.log("Welcome to our users list from the user");
          console.log(req.results)
          return res.json({ 
            data: results
          });
        })
      })
    }
  
    getCurrentUser(){
  
      app.get('/current-user', (req, res) => {
        
        const {email} = req.query;
  
        const sql = `SELECT * FROM users where email = ?`
        
        conn.query(sql, [email], (err, results) => {
          if (err) return err;
          
          console.log("Welcome "+ email);
          console.log(req.results)
          return res.json({ 
            data: results
          });
        })
      })
    }
    
    onSignIn(){
     
      app.post("/sign_in/user", (req, res) => {
     
        const {email, password} = req.query;
     
        const sql = "select * from users where email = ? and passCode = ?;" 
    
         conn.query(sql, [email, password], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                var currentEmail = email
                console.log("Successfully sign In", currentEmail)
                console.log(currentEmail)
    
               return res.send(result);
              }
            }
          );
        });
    }
    
    init(){
      this.onSignIn()
      this.onSignUp()
      this.readUsers()
      this.getCurrentUser()
    }
    }
  
    module.exports = {Users}