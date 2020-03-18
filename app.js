const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

var data = [];
const app = express();

// Create Server
app.listen(8000, err=>{
	if (err) throw err;
	console.log("Server started on port 8000");
});

// Express static pages - HTML/CSS/JS
app.use(express.static("views"));

app.use(bodyParser.urlencoded({ extended: true }));

// Call different pages - Home/Packages/Register/Contact/404
//  Home Page
app.get("/", (req, res)=>{
	res.sendFile(__dirname + "/index.html");
});

// Packages Page
app.get("/holiday-packages", (req, res)=>{
	res.sendFile(__dirname + "/holiday_packages.html");
});

// Register Page
app.get("/register", (req, res)=>{
	res.sendFile(__dirname + "/register.html");
});

// Contact Page
app.get("/contact-us", (req, res)=>{
	res.sendFile(__dirname + "/contact.html");
});

// 404 Page
app.get("*", (req, res)=>{
	res.sendFile(__dirname + "/404.html");
});

// Thank you Page
app.get("/thanks", (req, res)=>{
	res.sendFile(__dirname + "/thanks.html");
});

// Registration Form
app.post("/post_form", (req, res)=>{
	console.log(req.body	);
	data[0] = req.body.CustFirstName;
	data[1] = req.body.CustLastName;
	data[2] = req.body.CustAddress;
	data[3] = req.body.CustCity;
	data[4] = req.body.CustProv;
	data[5] = req.body.CustPostal;
	data[6] = req.body.CustCountry;
	data[7] = req.body.CustHomePhone;
	data[8] = req.body.CustBusPhone;
	data[9] = req.body.CustEmail;
	data[10] = req.body.AgentId;
	var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`,"
			+ " `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`,"
			+ " `CustHomePhone`, `CustBusPhone`, `CustEmail`, `AgentId`) "
			+ "VALUES (?,?,?,?,?,?,?,?,?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log("Customer data received successfully.")
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.redirect("/thanks");
	
//  Holiday Packages population
	app.get("/holiday-packages", (req, res)=>{
		var conn = mysql.createConnection({
			host: "localhost",
			user: "Wintech",
			password: "password",
			database: "travelexperts"
		})
		
		conn.connect((err) => {
			if (err) throw err;
			var sql = "SELECT * from `packages`";
			conn.query(sql, (err, result, fields) => {
				if (err) throw err;
				res.writeHead(200, {"Content-Type":"text/html"})
				fs.readFile(__dirname + "/holiday_packages.html", (err, data) => {
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
});
