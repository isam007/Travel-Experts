const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

var data = [];
const app = express();

app.listen(8000, err=>{
	if (err) throw err;
	console.log("server started");
});

app.use(express.static("views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/index", (req, res)=>{
	res.sendFile(__dirname + "/index.html");
});

app.get("/register", (req, res)=>{
	res.sendFile(__dirname + "/register.html");
});

app.get("/contact-us", (req, res)=>{
	res.sendFile(__dirname + "/contact.html");
});

app.get("/", (req, res)=>{
	res.sendFile(__dirname + "/404.html");
});

// app.use((req, res, next) => {
//       res.status(404).send(__dirname + "/404.html");
//     });
    

app.get("/thanks", (req, res)=>{
	res.sendFile(__dirname + "/thanks.html");
});

app.post("/post_form", (req, res)=>{
	console.log(req.body);
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
		user: "Anas",
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
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.redirect("/thanks");
});
