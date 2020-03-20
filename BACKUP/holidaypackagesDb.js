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

// Holiday Package Population
app.get("/holiday-packages", (req,res)=>{
    const conn = mysql.createConnection({
        host: "localhost",
        user: "Wintech",
        password: "password",
        database: "travelexperts"
    })
    
    conn.connect((err) => {
        if (err) throw err;
        var sql = "select * from packages";

        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, {"Content-Type":"text/html"})
            fs.readFile("holiday_packages.html", (err, data) => {
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
            for (pkg of result)
            {
                res.write("<tr>")
                var values = Object.values(pkg);
                for (i=0; i < values.length; i++)
                {
                    res.write("<td>" + values[i] + "</td>")
                }
                res.write("</tr>")
            }
            res.write("</body></html>");

                res.end();
            
            })
        })
        
    })

})