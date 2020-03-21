// Author Irada Shamilova

module.exports = (req, res)=>{
  const express = require("express");
  const path = require("path");
  const mysql = require("mysql");
  const bodyParser = require("body-parser");
  
  // Populate packages (Author: Irada Shamilova)
    var conn = mysql.createConnection({
    host: "localhost",
    user: "Wintech",
    password: "password",
    database: "travelexpertsWT"
    });
  
    conn.connect((err)=>{
      if (err) throw err;
      var sql = "SELECT * FROM packages";
      //const packagesDb = '';
      conn.query(sql, (err, packagesDb, fields)=>{
      //	if (err) throw err;
        // console.log(packagesDb);
  
        let content = '';
  
        // Loop through each element in the packages and append to content
        // Note: I've attached url link to the image rather than as a separate link
        packagesDb.forEach(function(package){
          let imgUrl = "/pictures/" + package.PkgImage + ".jpg";
          let startDate = package.PkgStartDate.getFullYear() + "/" + (package.PkgStartDate.getMonth() + 1) + "/" + package.PkgStartDate.getDate();
          let endDate = package.PkgEndDate.getFullYear() + "/" + (package.PkgEndDate.getMonth() + 1) + "/" + package.PkgEndDate.getDate();
  
          if (package.PkgEndDate > new Date()) {
            let past = "" 
            if (package.PkgStartDate < new Date()) {
              past = "red"
            }
          
            //console.log(startDate)
  
            content +=  `div style = "display: none"><div class= "flex-col">
                        <h2 class="center header-blue"> ${package.PkgName} </h2>
                        <div class="inline"><span class="packages center ${past}">Dates: ${startDate} </span> <span class="packages center"> to ${endDate}</span></div>
                        <p class="packages center">Price: $${package.PkgBasePrice} </p>
                        <a href = "/register.html"><img class="package-img shadow2" src= ${imgUrl} alt="Destination: ${package.PkgName}" width="200px" height="200px></a>
                        <a href = "/register.html"><button type="button" class="center-button order-button">Book Me!</button> </a>
                        </div></div`
          }	
        });
        
    
          // console.log(content);
          res.render('packages', { pugPackages : content });
          
          conn.end((err)=>{
          if (err) throw err;
        });
      });
    }); 
  }