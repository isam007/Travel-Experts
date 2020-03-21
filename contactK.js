const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');

// Create Server
app.listen(8000, err=>{
	if (err) throw err;
	console.log("Server started on port 8000");
});

// Contact Page population
app.get("/contact-us", (req,res)=>{
    const conn = mysql.createConnection({
        host: "localhost",
        user: "Wintech",
        password: "password",
        database: "travelexperts"
    });
    
    conn.connect((err) => {
        if (err) throw err;
        var sql = "SELECT agencies.AgncyAddress, agencies.AgncyPhone, agents.AgtFirstName," 
            + "agents.AgtLastName, agents.AgtBusPhone, agents.AgtEmail, agents.AgtPosition" 
            + " FROM agencies JOIN agents ON agencies.AgencyId = agents.AgencyId"
            + " ORDER by agencies.AgncyAddress";
        // var sql1 = "select * from agents";
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, {"Content-Type":"text/html"})
            fs.readFile("contact.html", (err, data) => {
                if (err) throw err;
                res.write(data) 
             // <table> tag --> <tr> create rows --> <td> create columns
            res.write("<table border='1'>")
            res.write("<tr>")
            for (column of fields)
            {
                res.write("<th>" + column.name + "</th>"); 
            }
            res.write("</tr>")
            for (agency of result)
            {
                res.write("<tr>")
                var values = Object.values(agency);
                for (i=0; i < values.length; i++)
                {
                    res.write("<td>" + values[i] + "</td>")
                }
                res.write("</tr>")
            }
            
            res.write("</body></html>");

            res.end();
            conn.end((err)=>{
			if (err) throw err;
		});
            
            })
        })
        
    })
})
