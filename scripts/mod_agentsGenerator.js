// Populate list of Agents (Author: Irada Shamilova)
module.exports = (req, res)=>{
  const express = require("express");
  const path = require("path");
  const mysql = require("mysql");
  const bodyParser = require("body-parser");    

      var conn = mysql.createConnection({
      host: "localhost",
      user: "Wintech",
      password: "password",
      database: "travelexpertsWT"
      });
    
      conn.connect((err)=>{
        if (err) throw err;
        var sql = "SELECT * FROM agents";
  
        conn.query(sql, (err, agentsDb, fields)=>{
  
    
          let contentAgents = '';
  
          // Loop through each element in the packages and append to content
          agentsDb.forEach(function(agent){
            
            
            contentAgents +=  `div style = "display: none"><div>
                        <h2 class="center header-blue"> ${agent.AgtFirstName} ${agent.AgtLastName} </h2>
                        <p class="packages center">Email: ${agent.AgtEmail}</p>
                        <p class="packages center">Phone: ${agent.AgtBusPhone} </p>
                        </div></div`	
          });
            
            //console.log(contentAgents);
            res.render('contact', { pugContacts : contentAgents });
            
            conn.end((err)=>{
            if (err) throw err;
          });
        });
      });	
    }