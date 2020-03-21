// Authors Karim Khan and Irada Shamilova
// Customer Order Module 
module.exports = (req, res)=>{
  const express = require("express");
  const path = require("path");
  const mysql = require("mysql");
  const bodyParser = require("body-parser");

	var data = []

	console.log(req.body);
	data[0] = req.body.CustFirstName;
	data[1] = req.body.CustLastName;
	data[2] = req.body.CustEmail;
	data[3] = req.body.CustAddress;
	data[4] = req.body.CustCity;
	data[5] = req.body.CustProv;
	data[6] = req.body.CustCountry;
	data[7] = req.body.CustPostal;	
	

	var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexpertsWT"
	});

	let customer = req.body.CustFirstName;

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`,`CustEmail`,"
			+ " `CustAddress`, `CustCity`, `CustProv`,  `CustCountry`, `CustPostal`)"
			+ "VALUES (?,?,?,?,?,?,?,?)";
		
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log("Customer data received successfully.")
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.render('thanks', { pugCustomer : customer, pugMessage : "You will now be redirected to procces your payment" });	
}