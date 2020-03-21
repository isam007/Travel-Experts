// submits customer information through Contact Us form to database
// Authors: Karim Khan and Irada Shamilova
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

	let customer = req.body.CustFirstName;

	var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexpertsWT"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`,"
			+ " `CustEmail`)"
			+ "VALUES (?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log("Customer data received successfully.")
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.render('thanks', { pugCustomer : customer, pugMessage : "We will respond in 24 hours" });	
}